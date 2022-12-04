import { Matrix2D } from './matrix'
import { TextStyle, TextStyleImpl } from './styles/label-style'
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

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type TextVerticalAlignment = 'top' | 'center' | 'bottom'
export type Baseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
export type Overflow = 'none' | 'word-break' | 'clip' | 'word-break + clip'
export type TextMeasure = (text: string, style: TextStyle) => any

export class TextBlock extends Drawable {
  #transform: Matrix2D = Matrix2D.identity
  private measure: (text: string, textStyle: TextStyle) => any
  text: string
  style: TextStyle
  target: IPoint
  alignment: TextAlignment = 'left'
  verticalAlignment: TextVerticalAlignment = 'top'
  baseline: Baseline = 'alphabetic'
  size?: Size
  overflow: Overflow = 'none'
  lineHeight: number = 0

  constructor (text: string, style: TextStyle, order: number = 0, measure?: TextMeasure) {
    super(order)
    this.text = text
    this.style = new TextStyleImpl(style || {}, () => (this.modified = true))
    this.measure = measure ?? ((text, style) => TextMeasurer.measureText(text, style))
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
    if (this.size) return this.computedLines.length * (w + this.lineHeight)
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

  get computedLines (): TextBlockLine[] {
    if (!this.size) throw new Error('The property size must be defined.')
    const lines = this.lines
    if (!lines) return []
    const maxWidth = this.overflow === 'word-break' || this.overflow === 'word-break + clip'
      ? this.size.width
      : Math.max.apply(null, lines.map(p => p.getWidth()))

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

  get computedSize (): Size {
    const lines = this.size ? this.computedLines : this.lines
    const rowHeight = this.charHeight
    const width = this.overflow === 'word-break' || this.overflow === 'word-break + clip'
      ? this.size!.width
      : Math.max.apply(null, lines.map(p => p.getWidth()))
    const height = this.overflow === 'clip' || this.overflow === 'word-break + clip'
      ? this.size!.height
      : lines.length * (rowHeight + this.lineHeight)

    return {
      width,
      height
    }
  }

  get bounds (): Rect {
    return new Rect(this.target, this.computedSize)
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
      lines // ,
      // remainder: width
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
