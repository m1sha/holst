import colors from './colors'
import { LabelStyle } from '../core/label-style'
import { Layer } from '../core/layers'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { Rect } from '../core/rect'
import Shape from '../core/shape'
import sizes from './sizes'
import { Viewport } from '../core/viewport'
import { Size } from '../core/size'
import { TooltipStyle } from './chart-options'

const createGrid = (layer: Layer, options: { viewport: Viewport, seed: { width: number, height: number } }): Shape => {
  const shape = new Shape(layer)
  const { viewport, seed } = options
  for (let i = viewport.top; i < viewport.height; i += seed.height) {
    shape.lineH({ x: viewport.x, y: viewport.top + i }, viewport.width)
  }

  const dx = viewport.width / seed.width
  for (let i = 0; i < dx; i++) {
    shape.lineV({ x: viewport.right - (i * seed.width), y: viewport.y }, viewport.height)
  }

  shape.style.strokeStyle = colors.gridLineColor
  shape.style.lineWidth = sizes.gridLineWidth
  return shape
}

const createBackground = (layer: Layer, color: string, rect: Rect): Shape => {
  const shape = new Shape(layer)
  shape.rect(rect).style.fillStyle = color
  return shape
}

const createAxis = (layer: Layer, viewport: Viewport): Shape => {
  const shape = new Shape(layer)
  shape.lineV({ x: viewport.left, y: viewport.top }, viewport.height)
  shape.lineH({ x: viewport.left, y: viewport.bottom }, viewport.width)
  shape.style.strokeStyle = colors.lineColor
  return shape
}

const createThresholds = (layer: Layer, axis: 'x' | 'y', thresholds: { value: number, color: string }[], bounds: Rect, padding: Padding): void => {
  for (const threshold of thresholds) {
    const shape = layer.createShape()
    if (axis === 'y') {
      const rect = {
        x: padding.left + 2,
        y: bounds.height - (bounds.y + padding.bottom) - 2,
        width: bounds.width - padding.left - padding.right - 4,
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

const createTooltipWindow = (layer: Layer, point: Point, viewport: Viewport, strings: string[], tooltipStyle: TooltipStyle): void => {
  const style: LabelStyle = { color: colors.selectLineFontColor, fontSize: '11pt' }
  const paddingLeft = 16
  const paddingTop = 18
  const lineHeight = tooltipStyle.lineHeight || 18
  const width = Math.max(layer.measureText(strings[0], style).width + paddingLeft, layer.measureText(strings[1], style).width + paddingLeft)
  const height = tooltipStyle?.size?.height || 42
  const tooltip = layer.createShape()
  let shiftLeft = 0
  if (viewport.right < point.x + width) {
    shiftLeft = width + 16
  }
  tooltip.rect({ x: point.x + 8 - shiftLeft, y: point.y, width, height })
  tooltip.style.strokeStyle = '#3a87a0'
  tooltip.style.fillStyle = '#faf7f0'
  layer.createText({ text: strings[0], x: _ => point.x + paddingLeft - shiftLeft, y: _ => point.y + paddingTop, style })
  layer.createText({ text: strings[1], x: _ => point.x + paddingLeft - shiftLeft, y: _ => point.y + paddingTop + lineHeight, style })
}

const createCorner = (layer: Layer, point: Point, size: Size): void => {
  const corner = layer.createShape()
  corner.style.strokeStyle = colors.selectLineColor
  corner.style.lineWidth = 2
  corner
    .moveTo(point)
    .lineTo({ x: point.x, y: size.height })
    .moveTo(point)
    .lineTo({ x: size.width, y: point.y })
}

export { createGrid, createBackground, createAxis, createThresholds, createTooltipWindow, createCorner }
