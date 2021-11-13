import colors from '../chart3/colors'
import { TextStyle } from '../core/label-style'
import { Layer } from '../core/layers'
import { Point } from '../core/point'
import { Viewport } from '../core/viewport'
import { TooltipStyle } from '../chart3/chart-options'

const createTooltipWindow = (layer: Layer, point: Point, viewport: Viewport, strings: string[], tooltipStyle: TooltipStyle): void => {
  const style: TextStyle = { color: colors.selectLineFontColor, fontSize: '11pt' }
  const paddingLeft = 16
  const paddingTop = 18
  const lineHeight = tooltipStyle.lineHeight || 18
  const width = Math.max(layer.measureText(strings[0], style).width + paddingLeft, layer.measureText(strings[1], style).width + paddingLeft)
  const height = tooltipStyle?.size?.height || getHeight(lineHeight, strings) // lineHeight * strings.length + 10
  const tooltip = layer.createShape()
  let shiftLeft = 0
  if (viewport.right < point.x + width) {
    shiftLeft = width + 16
  }
  tooltip.rect({ x: point.x + 8 - shiftLeft, y: point.y, width, height })
  tooltip.style.strokeStyle = '#3a87a0'
  tooltip.style.fillStyle = '#faf7f0'
  let y = point.y + paddingTop
  const x = point.x + paddingLeft - shiftLeft
  for (const str of strings) {
    y = createMultiText(layer, str, { x, y }, lineHeight, style)
  }
}

const createMultiText = (layer: Layer, text: string, point: Point, lineHeight: number, style: TextStyle) => {
  if (!text) return point.y
  if (text.indexOf('\n') < 0) {
    layer.createText({ value: text, x: _ => point.x, y: _ => point.y, style })
    return point.y + lineHeight
  }
  const lines = text.split('\n')
  let y = 0
  for (const line of lines) {
    if (!line) continue
    createLine(layer, line, { x: point.x, y: point.y + y }, style)
    y += lineHeight
  }
  return point.y + y
}

const createLine = (layer: Layer, text: string, point: Point, style: TextStyle) => {
  layer.createText({ value: text, x: _ => point.x, y: _ => point.y, style })
}

const getHeight = (lineHeight: number, strings: string[]) => {
  let count = 0
  for (const s of strings) {
    const val = s.split('\n').length
    count = val > 0 ? count + val : count++
  }
  return count * lineHeight + 10
}

export { createTooltipWindow }
