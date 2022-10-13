import { TextStyle } from './label-style'
import Context2DFactory from './render/canvas-rendering-context-2d-factory'
import { applyGraphicStyle } from './styles/apply-graphic-style'

export class TextMeasurer {
  static measureText (text: string, style: TextStyle) {
    const ctx = Context2DFactory.default.ctx
    return this.measureTextInt(ctx, text, style)
  }

  private static measureTextInt (ctx: CanvasRenderingContext2D, text: string, style: TextStyle) {
    ctx.save()
    this.assignTextStyle(ctx, style)
    const result = ctx.measureText(text)
    ctx.restore()
    return result
  }

  private static assignTextStyle (ctx: CanvasRenderingContext2D, style: TextStyle) {
    style = style || {}
    ctx.fillStyle = style.color ? applyGraphicStyle(style.color, ctx) : '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    ctx.font = `${fontSize} ${fontName}`
  }
}
