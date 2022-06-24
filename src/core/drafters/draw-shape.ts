import Shape from '../shape'
import { Color } from '../color'

export function drawShape (ctx: CanvasRenderingContext2D, shape: Shape) {
  const { style } = shape
  const path = shape.toPath2D()
  if (style.strokeStyle) {
    ctx.strokeStyle = style.strokeStyle instanceof Color ? style.strokeStyle.toString() : style.strokeStyle
    ctx.lineWidth = style.lineWidth || 1
    ctx.lineJoin = style.lineJoin || 'bevel'
    ctx.lineDashOffset = style.lineDashOffset || 0
    ctx.lineCap = style.lineCap || 'butt'
    if (style.lineDash) ctx.setLineDash(style.lineDash)
    ctx.stroke(path)
  }
  if (style.fillStyle) {
    ctx.fillStyle = style.fillStyle instanceof Color ? ctx.fillStyle = style.fillStyle.toString() : style.fillStyle
    ctx.fill(path)
  }
}
