import { Color } from '../colors/color'
import { GraphicStyle, NativeGraphicStyle } from './graphic-style'
import { LinearGradient } from '../gradients/linear-gradient'
import { RadialGradient } from '../gradients/radial-gradient'
import { ConicGradient } from '../gradients/conic-gradient'
import { Gradient } from '../gradients/gradient'
import { ColorStop } from '../gradients/color-stop'
import { Pattern } from '../pattern'
import { Rect } from '../geometry/rect'
import CanvasRenderingContext2DFactory from '../render/canvas-rendering-context-2d-factory'
import { drawRaster } from '../render/drafters/draw-raster'
import { Matrix2D } from '../matrix'

export function applyGraphicStyle (style: GraphicStyle, ctx: CanvasRenderingContext2D): NativeGraphicStyle {
  if (style instanceof Color) return style.toString()

  if (style instanceof LinearGradient) {
    const gradient = ctx.createLinearGradient(style.start.x, style.start.y, style.end.x, style.end.y)
    applyColorStops(gradient, style.stops)
    return gradient
  }

  if (style instanceof RadialGradient) {
    const gradient = ctx.createRadialGradient(style.start.x, style.start.y, style.startRadius, style.end.x, style.end.y, style.endRadius)
    applyColorStops(gradient, style.stops)
    return gradient
  }

  if (style instanceof ConicGradient) {
    const gradient = ctx.createConicGradient(style.point.x, style.point.y, style.angle)
    applyColorStops(gradient, style.stops)
    return gradient
  }

  if (style instanceof Gradient) {
    throw new Error('Gradient is an abstract class')
  }

  if (style instanceof Pattern) {
    if (new Rect(style.raster.distRect).equals(style.raster.srcRect)) {
      return ctx.createPattern(style.raster.src, style.repetition)!
    }

    const rendererContext = CanvasRenderingContext2DFactory.create(style.raster.distRect)
    drawRaster(rendererContext.ctx, style.raster, null, Matrix2D.identity)

    return ctx.createPattern(rendererContext.canvas, style.repetition)!
  }

  return style
}

function applyColorStops (gradient: CanvasGradient, stops: ColorStop[]) {
  for (const stop of stops) {
    gradient.addColorStop(stop.offset, stop.color instanceof Color ? stop.color.toString() : stop.color)
  }
}
