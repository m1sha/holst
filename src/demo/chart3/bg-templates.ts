import colors from './colors'
import { Layer } from '../../core/layers'
import { Padding } from '../../core/padding'
import { Point } from '../../core/point'
import { Rect } from '../../core/rect'
import Shape from '../../core/shape'
import sizes from './sizes'
import { Viewport } from '../../core/viewport'
import { Size } from '../../core/size'
import { MutablePath2D } from '../../core/path2d/mutable-path2d'

const createGrid = (layer: Layer, options: { viewport: Viewport, seed: { width: number, height: number } }): Shape => {
  const shape = new Shape(new MutablePath2D(), 0)
  const { viewport, seed } = options
  for (let i = viewport.top; i < viewport.height; i += seed.height) {
    shape.lineH(new Point({ x: viewport.x, y: viewport.top + i }), viewport.width)
  }

  const dx = viewport.width / seed.width
  for (let i = 0; i < dx; i++) {
    shape.lineV(new Point({ x: viewport.right - (i * seed.width), y: viewport.y }), viewport.height)
  }

  shape.style.strokeStyle = colors.gridLineColor
  shape.style.lineWidth = sizes.gridLineWidth
  return shape
}

const createBackground = (layer: Layer, color: string, rect: Rect): Shape => {
  const shape = new Shape(new MutablePath2D(), 0)
  shape.rect(rect).style.fillStyle = color
  return shape
}

const createAxis = (layer: Layer, viewport: Viewport): Shape => {
  const shape = new Shape(new MutablePath2D(), 0)
  shape.lineV(new Point({ x: viewport.left, y: viewport.top }), viewport.height)
  shape.lineH(new Point({ x: viewport.left, y: viewport.bottom }), viewport.width)
  shape.style.strokeStyle = colors.lineColor
  return shape
}

const createThresholds = (layer: Layer, axis: 'x' | 'y', thresholds: { value: number, color: string }[], bounds: Rect, padding: Padding): void => {
  for (const threshold of thresholds) {
    const shape = layer.createShape()
    if (axis === 'y') {
      const rect = new Rect(
        padding.left + 2,
        bounds.height - (bounds.y + padding.bottom) - 2,
        bounds.width - padding.left - padding.right - 4,
        (threshold.value - padding.top) - (bounds.height - padding.bottom - padding.top)
      )
      shape.rect(rect)
    }
    if (axis === 'x') {
      shape.rect(new Rect(threshold.value, bounds.y, threshold.value, bounds.height))
    }
    shape.style.fillStyle = threshold.color
  }
}

const createCorner = (layer: Layer, point: Point, size: Size): void => {
  const corner = layer.createShape()
  corner.style.strokeStyle = colors.selectLineColor
  corner.style.lineWidth = 2
  corner
    .moveTo(point)
    .lineTo(new Point({ x: point.x, y: size.height }))
    .moveTo(point)
    .lineTo(new Point({ x: size.width, y: point.y }))
}

export { createGrid, createBackground, createAxis, createThresholds, createCorner }
