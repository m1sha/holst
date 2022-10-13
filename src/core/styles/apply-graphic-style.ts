import { Color } from '../color'
import { GraphicStyle, NativeGraphicStyle } from './graphic-style'
import { LinearGradient } from '../gradients/linear-gradient'
import { RadialGradient } from '../gradients/radial-gradient'
import { ConicGradient } from '../gradients/conic-gradient'
import { Gradient } from '../gradients/gradient'
import { ColorStop } from '../gradients/color-stop'

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

  return style
}

function applyColorStops (gradient: CanvasGradient, stops: ColorStop[]) {
  for (const stop of stops) {
    gradient.addColorStop(stop.offset, stop.color instanceof Color ? stop.color.toString() : stop.color)
  }
}
