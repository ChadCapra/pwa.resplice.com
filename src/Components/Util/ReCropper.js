import React, { useState, useRef, useEffect } from 'react'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import ReButton from '../Button/ReButton'

const getCanvas = srcCanvas => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const width = srcCanvas.width
  const height = srcCanvas.height

  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(srcCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  )
  context.fill()
  return canvas
}

const ReCropper = ({ img, onCrop }) => {
  const [cropper, setCropper] = useState(null)
  const image = useRef(null)

  useEffect(() => {
    // Create URL
    const src = window.URL.createObjectURL(img)
    image.current.src = src

    setCropper(
      new Cropper(image.current, {
        aspectRatio: 1,
        viewMode: 1,
        ready: () => {},
        crop: e => {}
      })
    )

    return () => {
      window.URL.revokeObjectURL(src)
    }
  }, [img, image])

  const buildURL = () => {
    const canvas = getCanvas(cropper.getCroppedCanvas())
    cropper.destroy()
    canvas.toBlob(blob => onCrop(blob))
  }

  return (
    <div className="re-cropper">
      <img ref={image} alt="Cropping" />

      <ReButton style={{ marginTop: '15px' }} type="primary" onClick={buildURL}>
        Crop & Upload
      </ReButton>
    </div>
  )
}

export default ReCropper
