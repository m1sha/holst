import Shape from '../../shape'
import { Color } from '../../color'

export function drawShape (ctx: CanvasRenderingContext2D, shape: Shape) {
  const { style } = shape
  const path = shape.toPath2D()
  if (style.stroke) {
    ctx.strokeStyle = style.stroke instanceof Color ? style.stroke.toString() : style.stroke
    ctx.lineWidth = style.lineWidth || 1
    ctx.lineJoin = style.lineJoin || 'bevel'
    ctx.lineDashOffset = style.lineDashOffset || 0
    ctx.lineCap = style.lineCap || 'butt'
    if (style.lineDash) ctx.setLineDash(style.lineDash)
    ctx.stroke(path)
  }
  if (style.fill) {
    ctx.fillStyle = style.fill instanceof Color ? ctx.fillStyle = style.fill.toString() : style.fill
    ctx.fill(path)
  }
}
