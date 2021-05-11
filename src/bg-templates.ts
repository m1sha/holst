import colors from './colors'
import { LabelStyle } from './label-style'
import { Layer } from './layers'
import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'
import Shape from './shape'
import sizes from './sizes'
import { Viewport } from './viewport'

const createGrid = (options: {bounds: Rect, seed: {width: number, height: number}}): Shape => {
  const shape = new Shape()
  const { bounds, seed } = options
  for (let i = bounds.y - seed.height; i < bounds.height + bounds.y; i += seed.height) {
    shape.lineH({ x: bounds.x, y: i }, bounds.width)
  }
  for (let i = bounds.x + seed.width; i < bounds.x + bounds.width; i += seed.width) {
    shape.lineV({ x: i, y: bounds.y }, bounds.height)
  }
  shape.style.strokeStyle = colors.gridLineColor
  shape.style.lineWidth = sizes.gridLineWidth
  return shape
}

const createBackground = (color: string, rect: Rect): Shape => {
  const shape = new Shape()
  shape.rect(rect).style.fillStyle = color
  return shape
}

const createAxis = (bounds: Rect, padding: Padding): Shape => {
  const shape = new Shape()
  // y
  shape
    .moveTo({ x: padding.left, y: padding.top })
    .lineTo({ x: padding.left, y: bounds.height - padding.bottom })
  // x
  shape
    .moveTo({ x: padding.left, y: bounds.height - padding.bottom })
    .lineTo({ x: bounds.width - padding.right, y: bounds.height - padding.bottom })
  shape.style.strokeStyle = colors.lineColor
  return shape
}

const createThresholds = (layer: Layer, axis: 'x' | 'y', thresholds: { value: number, color: string }[], bounds: Rect, padding: Padding): void => {
  for (const threshold of thresholds) {
    const shape = layer.createShape()
    if (axis === 'y') {
      const rect = {
        x: padding.left,
        y: bounds.height - (bounds.y + padding.bottom),
        width: bounds.width - padding.left - padding.right,
        height: (threshold.value - padding.top) - (bounds.height - padding.bottom - padding.top)
      }
      shape.rect(rect)
    }
    if (axis === 'x') {
      shape.rect({ x: threshold.value, y: bounds.y, width: threshold.value, height: bounds.height })
    }
    shape.style.fillStyle = threshold.color
  }
}

const createTooltipWindow = (layer: Layer, point: Point, viewport: Viewport, strings: string[]): void => {
  const width = 140
  const height = 40
  const style: LabelStyle = { color: colors.selectLineFontColor, fontSize: '11pt' }
  const tooltip = layer.createShape()
  let shiftLeft = 0
  if (viewport.right < point.x + width) {
    shiftLeft = 160
  }
  tooltip.rect({ x: point.x + 8 - shiftLeft, y: point.y, width, height })
  tooltip.style.strokeStyle = '#3a87a0'
  tooltip.style.fillStyle = '#faf7f0'
  layer.createText({ text: strings[0], x: _ => point.x + 16 - shiftLeft, y: _ => point.y + 18, style })
  layer.createText({ text: strings[1], x: width => point.x + 16 - shiftLeft, y: _ => point.y + 18 + 15, style })
}

const createCorner = (layer: Layer, point: Point, width: number, height: number): void => {
  const corner = layer.createShape()
  corner.style.strokeStyle = colors.selectLineColor
  corner.style.lineWidth = 2
  corner
    .moveTo(point)
    .lineTo({ x: point.x, y: height })
    .moveTo(point)
    .lineTo({ x: width, y: point.y })
}

export { createGrid, createBackground, createAxis, createThresholds, createTooltipWindow, createCorner }
