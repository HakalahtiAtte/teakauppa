'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as fabric from 'fabric'
import imageCompression from 'browser-image-compression'

const CANVAS_WIDTH = 480
const CANVAS_HEIGHT = 560

// Print area configs per product type and side.
// content: product body bounds within the image (fractions of rendered dimensions)
// front/back: print area as centre (cx, cy) + size (w, h), all as fractions of content bounds.
// These need visual calibration against the actual photos — adjust cx/cy/w/h to fit.
// cx/cy are the fractional position of the print area CENTRE within the content bounds.
// w/h are the fractional size of the print area relative to content bounds.
const PRINT_CONFIGS = {
  tshirt: {
    content: { left: 0.098, top: 0.018, right: 0.901, bottom: 0.971 },
    front: { cx: 0.50,  cy: 0.33,  w: 0.38, h: 0.26 },
    back:  { cx: 0.50,  cy: 0.25,  w: 0.38, h: 0.26 },
  },
  hoodie: {
    content: { left: 0.10,  top: 0.03,  right: 0.90,  bottom: 0.97  },
    front: { cx: 0.50,  cy: 0.35,  w: 0.32, h: 0.22 },
    back:  { cx: 0.50,  cy: 0.26,  w: 0.32, h: 0.22 },
  },
  tote: {
    content: { left: 0.08,  top: 0.04,  right: 0.92,  bottom: 0.93  },
    front: { cx: 0.50,  cy: 0.75,  w: 0.55, h: 0.40 },
  },
  mug: {
    content: { left: 0.05,  top: 0.10,  right: 0.95,  bottom: 0.90  },
    front: { cx: 0.42,  cy: 0.45,  w: 0.38, h: 0.32 },
  },
  socks: {
    content: { left: 0.18,  top: 0.03,  right: 0.82,  bottom: 0.97  },
    front: { cx: 0.675, cy: 0.27,  w: 0.20, h: 0.20 },
  },
  beanie: {
    content: { left: 0.12,  top: 0.04,  right: 0.88,  bottom: 0.88  },
    front: { cx: 0.50,  cy: 0.65,  w: 0.55, h: 0.28 },
  },
}

function loadNativeImage(src, signal) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const cleanup = () => {
      img.onload = null
      img.onerror = null
      signal?.removeEventListener('abort', abort)
    }
    const abort = () => {
      cleanup()
      img.src = ''
      reject(new DOMException('Image loading cancelled', 'AbortError'))
    }
    if (signal?.aborted) {
      abort()
      return
    }
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      cleanup()
      resolve(img)
    }
    img.onerror = () => {
      cleanup()
      reject(new Error('Image could not be loaded'))
    }
    signal?.addEventListener('abort', abort, { once: true })
    img.src = src
  })
}

function computeLayout(htmlImg, type, side) {
  const config = PRINT_CONFIGS[type] ?? PRINT_CONFIGS.tshirt
  const content = config.content
  const sideConfig = config[side] ?? config.front

  const naturalW = htmlImg.naturalWidth
  const naturalH = htmlImg.naturalHeight
  const imgScale = Math.min(CANVAS_WIDTH / naturalW, CANVAS_HEIGHT / naturalH)
  const renderedW = naturalW * imgScale
  const renderedH = naturalH * imgScale
  const imgLeft = (CANVAS_WIDTH - renderedW) / 2
  const imgTop = (CANVAS_HEIGHT - renderedH) / 2

  const contentLeft = imgLeft + renderedW * content.left
  const contentTop = imgTop + renderedH * content.top
  const contentW = renderedW * (content.right - content.left)
  const contentH = renderedH * (content.bottom - content.top)

  const printW = contentW * sideConfig.w
  const printH = contentH * sideConfig.h
  const printLeft = contentLeft + contentW * sideConfig.cx - printW / 2
  const printTop = contentTop + contentH * sideConfig.cy - printH / 2

  return {
    imgScale,
    imgLeft,
    imgTop,
    printArea: { left: printLeft, top: printTop, width: printW, height: printH },
  }
}

export default function MockupEditor({ product, selectedSide = 'front', shirtImageUrl, onAddToCart, added }) {
  const canvasElRef = useRef(null)
  const fabricRef = useRef(null)
  const printAreaRef = useRef(null)
  const guideRef = useRef(null)
  const artworkStateRef = useRef({ front: null, back: null })
  const displayedSideRef = useRef(null)
  const displayedProductRef = useRef(null)
  const imageRequestRef = useRef(0)

  const [imageResult, setImageResult] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [hasTeaImage, setHasTeaImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const outerRef = useRef(null)
  const [displayScale, setDisplayScale] = useState(1)
  const selectionKey = JSON.stringify([product.id, product.type, shirtImageUrl, selectedSide, retryCount])
  const isCurrentResult = imageResult?.key === selectionKey
  const imageError = isCurrentResult ? imageResult.error : null
  const isReady = isCurrentResult && !imageError

  useEffect(() => {

    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: prefersDark ? '#231F1D' : '#f9f9f9',
      selection: false,
    })
    fabricRef.current = canvas

    return () => {
      imageRequestRef.current += 1
      fabricRef.current = null
      guideRef.current = null
      displayedSideRef.current = null
      displayedProductRef.current = null
      artworkStateRef.current = { front: null, back: null }
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const controller = new AbortController()
    const requestId = ++imageRequestRef.current

    async function doSwap() {
      try {
        const htmlImg = await loadNativeImage(shirtImageUrl, controller.signal)
        if (controller.signal.aborted || imageRequestRef.current !== requestId || fabricRef.current !== canvas) return

        const { imgScale, imgLeft, imgTop, printArea } = computeLayout(htmlImg, product.type, selectedSide)

        const fabricImg = new fabric.FabricImage(htmlImg)
        fabricImg._isShirt = true
        fabricImg.set({
          originX: 'left', originY: 'top',
          left: imgLeft, top: imgTop,
          scaleX: imgScale, scaleY: imgScale,
          selectable: false, evented: false, hoverCursor: 'default',
        })
        const sideChanged = displayedSideRef.current !== selectedSide
        const productChanged = displayedProductRef.current !== product.id
        const teaObj = canvas.getObjects().find((object) => object._isTea)
        if (productChanged) {
          artworkStateRef.current = { front: null, back: null }
        } else if (sideChanged && displayedSideRef.current) {
          artworkStateRef.current[displayedSideRef.current] = teaObj ?? null
        }
        if (sideChanged || productChanged) {
          canvas.discardActiveObject()
          if (teaObj) canvas.remove(teaObj)
          const savedArtwork = artworkStateRef.current[selectedSide]
          if (savedArtwork) {
            canvas.add(savedArtwork)
            canvas.setActiveObject(savedArtwork)
          }
          setHasTeaImage(Boolean(savedArtwork))
        }
        const oldShirt = canvas.getObjects().find((object) => object._isShirt)
        if (oldShirt) canvas.remove(oldShirt)
        canvas.add(fabricImg)
        canvas.sendObjectToBack(fabricImg)
        if (!guideRef.current) {
          const guide = new fabric.Rect({
            originX: 'left', originY: 'top',
            fill: 'transparent', stroke: '#8B5E3C', strokeWidth: 1.5,
            strokeDashArray: [6, 4], selectable: false, evented: false, opacity: 0.8,
          })
          guide._isGuide = true
          guideRef.current = guide
          canvas.add(guide)
        }
        guideRef.current.set(printArea)
        guideRef.current.setCoords()
        printAreaRef.current = printArea
        displayedSideRef.current = selectedSide
        displayedProductRef.current = product.id
        canvas.renderAll()
        setError(null)
        setImageResult({ key: selectionKey, error: null })
      } catch (loadError) {
        if (loadError.name !== 'AbortError' && !controller.signal.aborted && imageRequestRef.current === requestId) {
          setImageResult({ key: selectionKey, error: 'Could not load the selected product image.' })
        }
      }
    }
    doSwap()
    return () => controller.abort()
  }, [shirtImageUrl, selectedSide, product.id, product.type, selectionKey])

  // Responsive resize
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setDisplayScale(Math.min(1, entry.contentRect.width / CANVAS_WIDTH))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    canvas.setDimensions({
      width: CANVAS_WIDTH * displayScale,
      height: CANVAS_HEIGHT * displayScale,
    })
    canvas.setZoom(displayScale)
    canvas.renderAll()
  }, [displayScale])

  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    const canvas = fabricRef.current
    const requestId = imageRequestRef.current
    if (!file || !canvas || !isReady) return
    const isCurrentUpload = () => fabricRef.current === canvas && imageRequestRef.current === requestId

    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.')
      return
    }

    setError(null)
    setIsLoading(true)

    let objectUrl = null
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      })

      objectUrl = URL.createObjectURL(compressed)

      if (!isCurrentUpload()) return

      const htmlImg = await loadNativeImage(objectUrl)

      if (!isCurrentUpload()) return
      const printArea = printAreaRef.current

      const fabricImg = new fabric.FabricImage(htmlImg)
      fabricImg._isTea = true

      const scale = Math.min(
        printArea.width / htmlImg.naturalWidth,
        printArea.height / htmlImg.naturalHeight
      )

      fabricImg.set({
        originX: 'center',
        originY: 'center',
        left: printArea.left + printArea.width / 2,
        top: printArea.top + printArea.height / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
        hasControls: true,
        cornerColor: '#8B5E3C',
        cornerStrokeColor: '#ffffff',
        borderColor: '#8B5E3C',
        borderScaleFactor: 1.5,
        cornerSize: 10,
        transparentCorners: false,
      })

      const existing = canvas.getObjects().find((o) => o._isTea)
      if (existing) canvas.remove(existing)
      canvas.add(fabricImg)
      canvas.bringObjectToFront(fabricImg)
      canvas.setActiveObject(fabricImg)
      canvas.renderAll()

      setHasTeaImage(true)
    } catch {
      if (isCurrentUpload()) setError('Something went wrong processing the image. Try again.')
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      if (fabricRef.current === canvas) setIsLoading(false)
      e.target.value = ''
    }
  }, [isReady])

  function handleDownload() {
    const canvas = fabricRef.current
    if (!canvas || !isReady) return
    const dimensions = { width: canvas.getWidth(), height: canvas.getHeight() }
    const viewport = [...canvas.viewportTransform]

    canvas.getObjects().forEach((o) => {
      if (o._isGuide) o.set('visible', false)
    })
    canvas.renderAll()

    try {
      canvas.setDimensions({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: 2,
        enableRetinaScaling: false,
      })
      const link = document.createElement('a')
      link.download = 'product-preview.png'
      link.href = dataUrl
      link.click()
    } catch {
      setError('Could not export the image. Try again.')
    } finally {
      canvas.setDimensions(dimensions)
      canvas.setViewportTransform(viewport)
      canvas.getObjects().forEach((o) => {
        if (o._isGuide) o.set('visible', true)
      })
      canvas.renderAll()
    }
  }

  function handleCanvasKeyDown(e) {
    const canvas = fabricRef.current
    if (!canvas || !isReady) return
    const obj = canvas.getActiveObject()
    if (!obj) return

    const delta = e.shiftKey ? 10 : 1
    const moves = {
      ArrowLeft: { left: obj.left - delta },
      ArrowRight: { left: obj.left + delta },
      ArrowUp: { top: obj.top - delta },
      ArrowDown: { top: obj.top + delta },
    }
    if (!moves[e.key]) return
    e.preventDefault()
    obj.set(moves[e.key])
    canvas.renderAll()
  }

  function handleRemoveTea() {
    const canvas = fabricRef.current
    if (!canvas || !isReady) return
    const existing = canvas.getObjects().find((o) => o._isTea)
    if (existing) {
      canvas.remove(existing)
      canvas.discardActiveObject()
      canvas.renderAll()
      setHasTeaImage(false)
      artworkStateRef.current[selectedSide] = null
    }
  }

  return (
    <div ref={outerRef} className="flex flex-col items-center gap-6 w-full">
      <div
        className="relative rounded-2xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.10))' }}
        tabIndex={isReady ? 0 : undefined}
        role={isReady ? 'application' : undefined}
        aria-label={isReady ? 'Product customiser. Use arrow keys to move your image, Shift+Arrow to move faster.' : undefined}
        onKeyDown={handleCanvasKeyDown}
      >
        <canvas ref={canvasElRef} />
        {!isReady && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-2xl"
            role="status"
          >
            <span className="text-sm text-neutral-500">{imageError ? 'Preview unavailable' : 'Loading editor…'}</span>
          </div>
        )}
      </div>

      {isReady && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <p className="text-xs text-neutral-500 text-center leading-relaxed">
            Position your image inside the dashed box — that&apos;s the print area.
            Drag to move, use corner handles to resize, or focus the canvas and use arrow keys (Shift for larger steps).
          </p>
          <p className="text-xs text-neutral-400 text-center">
            This editor creates a preview only — the base product is what gets ordered.
          </p>

          <label
            className={`w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-brand px-6 py-3 text-sm font-medium text-brand-text transition-colors duration-200 hover:bg-brand/5 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 focus-within:outline-none ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            {isLoading ? 'Processing…' : 'Upload your image'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleFileUpload}
              disabled={isLoading}
              aria-label="Upload an image for your preview"
            />
          </label>

          {error && (
            <p className="text-xs text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          {hasTeaImage && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-brand px-5 py-3 text-sm font-semibold text-brand-text hover:bg-brand/5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label="Download product preview as PNG"
                >
                  Download preview
                </button>
                <button
                  onClick={handleRemoveTea}
                  className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-200 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label="Remove uploaded image"
                >
                  Remove
                </button>
              </div>
              {onAddToCart && (
                <button
                  onClick={onAddToCart}
                  className="w-full inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label="Add plain product to cart"
                >
                  {added ? 'Plain product added!' : 'Add plain product to cart'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {imageError && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-sm text-red-500" role="alert">{imageError}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="rounded-full border border-brand px-5 py-3 text-sm font-semibold text-brand-text hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Retry preview
          </button>
        </div>
      )}
    </div>
  )
}
