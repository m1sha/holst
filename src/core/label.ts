import { TextStyle } from './label-style'
import Orderable from './orderable'
import { Point } from './point'
import { point } from './utils'

export interface Text {
  value: string,
  x: (textWidth: number) => number,
  y: (textWidth: number) => number,
  style: TextStyle
}

export class TextBlock implements Orderable {
  private measure: (text: string, textStyle: TextStyle) => any
  text: string
  style: TextStyle
  order: number
  after?: Orderable
  before?: Orderable
  target: Point

  constructor (text: string, style: TextStyle, order: number = 0, measure: (text: string, style: TextStyle) => any) {
    this.text = text
    this.style = style
    this.order = order
    this.measure = measure
    this.target = point(0, 0)
  }

  get multiline () : boolean { return this.lines.length > 1 }

  get width (): number {
    if (this.multiline) {
      const widths = []
      this.lines.forEach(p => widths.push(this.getWidth(p)))
      return Math.max.apply(null, widths)
    }
    return this.getWidth()
  }

  get height (): number {
    const w = this.getHeight()
    if (this.multiline) return this.lines.length * w
    return w
  }

  get lineHeight (): number {
    return this.getHeight()
  }

  get lines () {
    const text = this.text
    if (!text) return []
    return text.indexOf('\n') > -1 ? text.split('\n') : [text]
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
