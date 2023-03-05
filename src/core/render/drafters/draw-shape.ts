import Shape from '../../shape'
import { Sketch } from '../../sketch'
import { Color } from '../../colors/color'
import { applyGraphicStyle } from '../../styles/apply-graphic-style'
import { ShapeStyle } from '../../styles/shape-style'
import { Matrix2D } from '../../matrix'

export function drawShape (ctx: CanvasRenderingContext2D, shape: Shape | Sketch, clip: Shape | null, viewportMatrix: Matrix2D) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D(viewportMatrix))

  const { style } = shape
  const path = shape.toPath2D(viewportMatrix)
  if (style.shadow) {
    const { x, y, blur, color } = style.shadow.values()
    ctx.shadowOffsetX = x
    ctx.shadowOffsetY = y
    ctx.shadowBlur = blur
    ctx.shadowColor = color instanceof Color ? color.toString() : color
  }
  ctx.translate(0.5, 0.5) // line thickness 1px
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
