/* global CanvasLineCap, CanvasLineJoin */
import { Color } from './color'
import { TextStyle } from './label-style'
import { ShapeStyle } from './shape-style'

export class StyleManager {
  private styles: Record<string, ShapeStyle | TextStyle> = {}

  defineShapeStyle (name: string, style: ShapeStyle): void {
    this.styles[name] = style
  }

  defineTextStyle (name: string, style: TextStyle): void {
    this.styles[name] = style
  }

  formTextStyle (name: string) {
    const current = this.styles[name] as TextStyle
    return {
      defineTextStyle: (name: string, style: TextStyle) => {
        const merge = Object.assign(style, current)
        this.defineTextStyle(name, merge)
      }
    }
  }

  shapes (name: string) {
    return new ShapeStyleDecorator(this.styles[name] as ShapeStyle)
  }

  texts (name: string) {
    return this.styles[name] as TextStyle
  }
}

class ShapeStyleDecorator implements ShapeStyle {
  lineCap?: CanvasLineCap
  lineDashOffset?: number
  lineDash?: number[]
  lineJoin?: CanvasLineJoin
  lineWidth?: number
  miterLimit?: number
  fillStyle?: string | CanvasGradient | CanvasPattern | Color
  strokeStyle?: string | CanvasGradient | CanvasPattern | Color
  constructor (style: ShapeStyle) {
    this.assign(style)
  }

  assign (style?: ShapeStyle) {
    if (style && !isUndefined(style.strokeStyle)) this.strokeStyle = style.strokeStyle
    if (style && !isUndefined(style.lineDashOffset)) this.lineDashOffset = style.lineDashOffset
    if (style && !isUndefined(style.lineDash)) this.lineDash = style.lineDash
    if (style && !isUndefined(style.lineJoin)) this.lineJoin = style.lineJoin
    if (style && !isUndefined(style.lineWidth)) this.lineWidth = style.lineWidth
    if (style && !isUndefined(style.miterLimit)) this.miterLimit = style.miterLimit
    if (style && !isUndefined(style.fillStyle)) this.fillStyle = style.fillStyle
    if (style && !isUndefined(style.strokeStyle)) this.strokeStyle = style.strokeStyle
    return this
  }

  clone (style?: ShapeStyle): ShapeStyleDecorator {
    return new ShapeStyleDecorator(this).assign(style)
  }
}

const isUndefined = (t: unknown) => typeof t === 'undefined' || t === undefined
