import { TextStyle } from './label-style'
import Orderable from './orderable'
import { Point } from './point'
import { Rect } from './rect'
import { TextMeasurer } from './text-measurer'

export interface Text {
  value: string,
  x: (textWidth: number) => number,
  y: (textWidth: number) => number,
  style: TextStyle
}

export interface TextBlockLine {
  text: string
  getWidth: () => number
}

export class TextBlock implements Orderable {
  private measure: (text: string, textStyle: TextStyle) => any
  text: string
  style: TextStyle
  order: number
  after?: Orderable
  before?: Orderable
  target: Point
  alignment: 'left' | 'center' | 'right' | 'justify' = 'left'
  lineHeight: number = 0

  constructor (text: string, style: TextStyle, order: number = 0, measure?: (text: string, style: TextStyle) => any) {
    this.text = text
    this.style = style
    this.order = order
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

  get bounds (): Rect {
    return new Rect(this.target, { width: this.width, height: this.height })
  }

  setMeasurer (measure: (text: string, style: TextStyle) => any): void {
    this.measure = measure
  }

  private getWidth (text?: string): number {
    return this.measure(text || this.text, this.style).width
  }

  private getHeight (text?: string) {
    const result = this.measure(text || this.text, this.style)
    if (result.actualBoundingBoxAscent && result.actualBoundingBoxDescent) {
      return result.actualBoundingBoxAscent + result.actualBoundingBoxDescent
    }
    return this.getWidth('M')
  }
}
