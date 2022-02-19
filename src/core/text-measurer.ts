import { TextStyle } from './label-style'

export class TextMeasurer {
  private static canvas: HTMLCanvasElement

  static measureText (text: string, style: TextStyle) {
    if (!this.canvas) this.canvas = document.createElement('canvas')
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error()
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
    ctx.fillStyle = style.color || '#000'
    const fontName = style.fontName || 'serif'
    const fontSize = style.fontSize || '10pt'
    ctx.font = `${fontSize} ${fontName}`
  }
}
