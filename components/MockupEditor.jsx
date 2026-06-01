'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as fabric from 'fabric'
import imageCompression from 'browser-image-compression'

const CANVAS_WIDTH = 480
const CANVAS_HEIGHT = 560

// Measured from pixel scan of shirtwhite.png — shirt content bounds as
// a fraction of the full 1200x1200 image (excludes transparent padding)
const SHIRT_CONTENT = { left: 0.098, top: 0.018, right: 0.901, bottom: 0.971 }

function loadNativeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export default function MockupEditor({ shirtImageUrl }) {
  const canvasElRef = useRef(null)
  const fabricRef = useRef(null)
  const printAreaRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [hasTeaImage, setHasTeaImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#f9f9f9',
      selection: false,
    })
    fabricRef.current = canvas

    loadNativeImage(shirtImageUrl).then((htmlImg) => {
      const naturalW = htmlImg.naturalWidth
      const naturalH = htmlImg.naturalHeight
      const scale = Math.min(CANVAS_WIDTH / naturalW, CANVAS_HEIGHT / naturalH)

      const renderedW = naturalW * scale
      const renderedH = naturalH * scale
      const imgLeft = (CANVAS_WIDTH - renderedW) / 2
      const imgTop = (CANVAS_HEIGHT - renderedH) / 2

      const fabricImg = new fabric.FabricImage(htmlImg)
      fabricImg.set({
        originX: 'left',
        originY: 'top',
        left: imgLeft,
        top: imgTop,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
      })
      canvas.add(fabricImg)

      // Place guide relative to actual shirt content (not the transparent padding)
      const contentLeft = imgLeft + renderedW * SHIRT_CONTENT.left
      const contentTop = imgTop + renderedH * SHIRT_CONTENT.top
      const contentW = renderedW * (SHIRT_CONTENT.right - SHIRT_CONTENT.left)
      const contentH = renderedH * (SHIRT_CONTENT.bottom - SHIRT_CONTENT.top)

      const printW = contentW * 0.38
      const printH = contentH * 0.26
      const printLeft = contentLeft + (contentW - printW) / 1.25
      const printTop = contentTop + contentH * 0.33

      const printArea = { left: printLeft, top: printTop, width: printW, height: printH }
      printAreaRef.current = printArea

      const guide = new fabric.Rect({
        left: printArea.left,
        top: printArea.top,
        width: printArea.width,
        height: printArea.height,
        fill: 'transparent',
        stroke: '#8B5E3C',
        strokeWidth: 1.5,
        strokeDashArray: [6, 4],
        selectable: false,
        evented: false,
        opacity: 0.8,
      })
      guide._isGuide = true
      canvas.add(guide)

      canvas.renderAll()
      setIsReady(true)
    })

    return () => {
      canvas.dispose()
    }
  }, [shirtImageUrl])

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

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      })

      const objectUrl = URL.createObjectURL(compressed)
      const canvas = fabricRef.current
      const printArea = printAreaRef.current

      const existing = canvas.getObjects().find((o) => o._isTea)
      if (existing) canvas.remove(existing)

      const htmlImg = await loadNativeImage(objectUrl)
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
      URL.revokeObjectURL(objectUrl)
    } catch {
      setError('Something went wrong processing the image. Try again.')
    } finally {
      setIsLoading(false)
      e.target.value = ''
    }
  }, [])

  function handleDownload() {
    const canvas = fabricRef.current

    canvas.getObjects().forEach((o) => {
      if (o._isGuide) o.set('visible', false)
    })
    canvas.renderAll()

    const dataUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 })

    canvas.getObjects().forEach((o) => {
      if (o._isGuide) o.set('visible', true)
    })
    canvas.renderAll()

    const link = document.createElement('a')
    link.download = 'tea-shirt-preview.png'
    link.href = dataUrl
    link.click()
  }

  function handleRemoveTea() {
    const canvas = fabricRef.current
    const existing = canvas.getObjects().find((o) => o._isTea)
    if (existing) {
      canvas.remove(existing)
      canvas.discardActiveObject()
      canvas.renderAll()
      setHasTeaImage(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.10))' }}
      >
        <canvas ref={canvasElRef} />
        {!isReady && (
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
            Drag to move, use corner handles to resize.
          </p>

          <label
            className={`w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-[#8B5E3C] px-6 py-3 text-sm font-medium text-[#8B5E3C] transition-colors duration-200 hover:bg-[#8B5E3C]/5 focus-within:ring-2 focus-within:ring-[#8B5E3C] focus-within:ring-offset-2 focus-within:outline-none ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
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
            <div className="flex gap-3 w-full">
              <button
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2 focus-visible:outline-none"
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
          )}
        </div>
      )}
    </div>
  )
}
