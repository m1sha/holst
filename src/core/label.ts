import { Matrix2D } from './matrix'
import { TextStyle } from './styles/label-style'
import { Point, IPoint } from './geometry/point'
import { Rect } from './geometry/rect'
import { TextMeasurer } from './text-measurer'
import { Size } from './geometry/size'
import { Drawable, DrawableType } from './drawable'
import { applyAnchor } from './anchor'

export interface TextBlockLine {
  text: string
  getWidth: () => number
}

export class TextBlock extends Drawable {
  #transform: Matrix2D = Matrix2D.identity
  private measure: (text: string, textStyle: TextStyle) => any
  text: string
  style: TextStyle
  target: IPoint
  alignment: 'left' | 'center' | 'right' | 'justify' = 'left'
  verticalAlignment: 'top' | 'center' | 'bottom' = 'top'
  baseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom' = 'alphabetic'
  size?: Size
  overflow: 'none' | 'word-break' | 'clip' | 'word-break + clip' = 'none'
  lineHeight: number = 0

  constructor (text: string, style: TextStyle, order: number = 0, measure?: (text: string, style: TextStyle) => any) {
    super(order)
    this.text = text
    this.style = style
    this.measure = measure ?? ((text: string, style: TextStyle) => TextMeasurer.measureText(text, style))
    this.target = new Point(0, 0)
  }

  get multiline () : boolean { return this.lines.length > 1 }

  get width (): number {
    if (this.multiline) {
      return Math.max.apply(null, this.lines.map(p => p.getWidth()))
    }
    return this.getWidth()
  }

  get height (): number {
    const w = this.getHeight()
    if (this.size) return this.wrappedLines.length * (w + this.lineHeight)
    if (this.multiline) return this.lines.length * (w + this.lineHeight)
    return w
  }

  get charHeight (): number {
    return this.getHeight()
  }

  get lines (): TextBlockLine[] {
    const text = this.text
    if (!text) return []
    return (text.indexOf('\n') > -1 ? text.split('\n') : [text]).map(p => {
      return {
        text: p,
        getWidth: () => this.getWidth(p)
      }
    })
  }

  get wrappedLines (): TextBlockLine[] {
    if (!this.size) throw new Error('The property size must be defined.')
    const lines = this.lines
    if (!lines) return []
    const maxWidth = this.size.width

    const result = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.getWidth() <= maxWidth) {
        result.push(line)
        continue
      }

      const res = this.splitLine(line.text, maxWidth)
      result.push(...res.lines.map(p => { return { text: p, getWidth: () => this.getWidth(p) } }))
    }

    return result
  }

  get bounds (): Rect {
    return new Rect(this.target, this.size ? this.size : { width: this.width, height: this.height })
  }

  get position (): IPoint {
    return applyAnchor(this)
  }

  setMeasurer (measure: (text: string, style: TextStyle) => any): void {
    this.measure = measure
  }

  copyStyle (): TextStyle {
    return {
      fontName: this.style.fontName,
      fontSize: this.style.fontSize,
      bold: this.style.bold,
      italic: this.style.italic,
      color: this.style.color
    }
  }

  protected get transform (): Matrix2D {
    return this.#transform
  }

  protected set transform (value: Matrix2D) {
    this.#transform = value
    this.update()
  }

  private getWidth (text?: string): number {
    const txt = typeof text === 'undefined' || text === undefined ? this.text : text
    return this.measure(txt, this.style).width
  }

  private getHeight (text?: string) {
    const result = this.measure(text || this.text, this.style)
    if (result.actualBoundingBoxAscent && result.actualBoundingBoxDescent) {
      return result.actualBoundingBoxAscent + result.actualBoundingBoxDescent
    }
    return this.getWidth('M')
  }

  private splitLine (text: string, maxWidth: number) {
    const words = text.split(' ')
    const lines = []
    let width = 0
    let sentence = ''

    for (const word of words) {
      const wordLen = this.getWidth(word + ' ')

      if (width + wordLen > maxWidth) {
        lines.push(sentence)
        sentence = word + ' '
        width = wordLen
        continue
      }

      sentence += word + ' '
      width += wordLen
    }

    if (sentence) lines.push(sentence)
    return {
      lines,
      remainder: width
    }
  }

  inPath (p: Point): boolean {
    const rect = this.bounds
    if (this.anchor && this.anchor.container) {
      rect.x += this.anchor.container.bounds.x
      rect.y += this.anchor.container.bounds.y
    }
    return rect.intersectsPoint(p)
  }

  getType (): DrawableType {
    return 'text'
  }

  static create (text: string, style: TextStyle, target?: IPoint) {
    const result = new TextBlock(text, style)
    if (target) result.target = target
    return result
  }
}
