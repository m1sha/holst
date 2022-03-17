import { TextStyle } from './label-style'
import Context2DFactory from './canvas-rendering-context-2d-factory'
import { Color } from './color'

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
    ctx.fillStyle = style.color instanceof Color ? style.color.toString() : style.color || '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    ctx.font = `${fontSize} ${fontName}`
  }
}
