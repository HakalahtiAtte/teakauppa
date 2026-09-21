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

function loadNativeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
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
  const disposedRef = useRef(false)
  const guideRef = useRef(null)
  const artworkStateRef = useRef({ front: null, back: null })
  const prevSideRef = useRef(selectedSide)
  const isFirstSwap = useRef(true)

  const [isReady, setIsReady] = useState(false)
  const [hasTeaImage, setHasTeaImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const outerRef = useRef(null)
  const [displayScale, setDisplayScale] = useState(1)

  // Init once: create canvas and load the first shirt image
  useEffect(() => {
    disposedRef.current = false
    isFirstSwap.current = true

    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: prefersDark ? '#231F1D' : '#f9f9f9',
      selection: false,
    })
    fabricRef.current = canvas

    loadNativeImage(shirtImageUrl)
      .then((htmlImg) => {
        if (disposedRef.current) return

        const { imgScale, imgLeft, imgTop, printArea } = computeLayout(htmlImg, product.type, selectedSide)
        printAreaRef.current = printArea

        const fabricImg = new fabric.FabricImage(htmlImg)
        fabricImg._isShirt = true
        fabricImg.set({
          originX: 'left', originY: 'top',
          left: imgLeft, top: imgTop,
          scaleX: imgScale, scaleY: imgScale,
          selectable: false, evented: false, hoverCursor: 'default',
        })
        canvas.add(fabricImg)

        const guide = new fabric.Rect({
          left: printArea.left, top: printArea.top,
          originX: 'left', originY: 'top',
          width: printArea.width, height: printArea.height,
          fill: 'transparent',
          stroke: '#8B5E3C', strokeWidth: 1.5,
          strokeDashArray: [6, 4],
          selectable: false, evented: false, opacity: 0.8,
        })
        guide._isGuide = true
        guideRef.current = guide
        canvas.add(guide)

        canvas.renderAll()
        setIsReady(true)
      })
      .catch(() => {
        if (!disposedRef.current) setError('Could not load the product image.')
      })

    return () => {
      disposedRef.current = true
      isFirstSwap.current = true
      canvas.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Swap: runs when colour or side changes after init — preserves artwork
  useEffect(() => {
    if (!isReady || !fabricRef.current) return

    if (isFirstSwap.current) {
      isFirstSwap.current = false
      prevSideRef.current = selectedSide
      return
    }

    const canvas = fabricRef.current
    const sideChanged = prevSideRef.current !== selectedSide
    const prevSide = prevSideRef.current
    prevSideRef.current = selectedSide

    async function doSwap() {
      try {
        if (sideChanged) {
          const teaObj = canvas.getObjects().find((o) => o._isTea)
          artworkStateRef.current[prevSide] = teaObj || null
          if (teaObj) canvas.remove(teaObj)
        }

        const oldShirt = canvas.getObjects().find((o) => o._isShirt)
        if (oldShirt) canvas.remove(oldShirt)

        const htmlImg = await loadNativeImage(shirtImageUrl)
        if (disposedRef.current) return

        const { imgScale, imgLeft, imgTop, printArea } = computeLayout(htmlImg, product.type, selectedSide)
        printAreaRef.current = printArea

        const fabricImg = new fabric.FabricImage(htmlImg)
        fabricImg._isShirt = true
        fabricImg.set({
          originX: 'left', originY: 'top',
          left: imgLeft, top: imgTop,
          scaleX: imgScale, scaleY: imgScale,
          selectable: false, evented: false, hoverCursor: 'default',
        })
        canvas.add(fabricImg)
        canvas.sendObjectToBack(fabricImg)

        if (guideRef.current) {
          guideRef.current.set({
            left: printArea.left, top: printArea.top,
            width: printArea.width, height: printArea.height,
          })
        }

        if (sideChanged) {
          const savedArtwork = artworkStateRef.current[selectedSide]
          if (savedArtwork) {
            canvas.add(savedArtwork)
            canvas.bringObjectToFront(savedArtwork)
            setHasTeaImage(true)
          } else {
            setHasTeaImage(false)
          }
        }

        canvas.renderAll()
      } catch {
        if (!disposedRef.current) setError('Could not load the product image.')
      }
    }
    doSwap()
  }, [isReady, shirtImageUrl, selectedSide]) // eslint-disable-line react-hooks/exhaustive-deps

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
    if (!file) return

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

      if (disposedRef.current) return

      const canvas = fabricRef.current
      const printArea = printAreaRef.current

      const existing = canvas.getObjects().find((o) => o._isTea)
      if (existing) canvas.remove(existing)

      const htmlImg = await loadNativeImage(objectUrl)

      if (disposedRef.current) return

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

      canvas.add(fabricImg)
      canvas.bringObjectToFront(fabricImg)
      canvas.setActiveObject(fabricImg)
      canvas.renderAll()

      setHasTeaImage(true)
    } catch {
      if (!disposedRef.current) setError('Something went wrong processing the image. Try again.')
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      setIsLoading(false)
      e.target.value = ''
    }
  }, [])

  function handleDownload() {
    const canvas = fabricRef.current
    if (!canvas) return
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
      link.download = 'tea-shirt-preview.png'
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
    if (!canvas) return
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
        {!isReady && !error && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-2xl"
            aria-label="Loading editor"
          >
            <span className="text-sm text-neutral-500">Loading editor…</span>
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
            {isLoading ? 'Processing…' : 'Upload your tea photo'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleFileUpload}
              disabled={isLoading}
              aria-label="Upload a photo of your tea"
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
                  aria-label="Download shirt preview as PNG"
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
                  aria-label="Add product to cart"
                >
                  {added ? 'Added to cart!' : 'Add to cart'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {error && !isReady && (
        <p className="text-sm text-red-500 text-center" role="alert">{error}</p>
      )}
    </div>
  )
}
