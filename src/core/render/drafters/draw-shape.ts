import Shape from '../../shape'
import { Shape2 } from '../../shape2'
import { Color } from '../../colors/color'
import { applyGraphicStyle } from '../../styles/apply-graphic-style'
import { ShapeStyle } from '../../styles/shape-style'

export function drawShape (ctx: CanvasRenderingContext2D, shape: Shape | Shape2, clip: Shape | null) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D())

  const { style } = shape
  const path = shape.toPath2D()
  if (shape.shadow.has()) {
    const { x, y, blur, color } = shape.shadow.values()
    ctx.shadowOffsetX = x
    ctx.shadowOffsetY = y
    ctx.shadowBlur = blur
    ctx.shadowColor = color instanceof Color ? color.toString() : color
  }

  if (style.fillStrokeOrder === 'stroke-first') {
    stoke(ctx, style, path)
    fill(ctx, style, path)
  } else {
    fill(ctx, style, path)
    stoke(ctx, style, path)
  }

  ctx.restore()
}

function stoke (ctx: CanvasRenderingContext2D, style: ShapeStyle, path: Path2D) {
  if (!style.stroke) return

  ctx.strokeStyle = applyGraphicStyle(style.stroke, ctx)
  ctx.lineWidth = style.lineWidth || 1
  ctx.lineJoin = style.lineJoin || 'bevel'
  ctx.lineDashOffset = style.lineDashOffset || 0
  ctx.lineCap = style.lineCap || 'butt'
  if (style.lineDash) ctx.setLineDash(style.lineDash)
  ctx.stroke(path)
}

function fill (ctx: CanvasRenderingContext2D, style: ShapeStyle, path: Path2D) {
  if (!style.fill) return

  ctx.fillStyle = applyGraphicStyle(style.fill, ctx)
  ctx.fill(path)
}
