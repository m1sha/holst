import { Matrix2D } from './matrix'
import { TextStyle } from './label-style'
import Orderable from './orderable'
import { EventType, Interactive } from './events/interactive'
import { Point } from './point'
import { Rect } from './rect'
import { TextMeasurer } from './text-measurer'
import { uid } from '../tools/uid'
import { EventHandlerBag, IEventHandler } from './events/event-handler2'

/** @deprecated */
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

export class TextBlock implements Interactive, Orderable {
  #transform: Matrix2D = Matrix2D.identity
  private measure: (text: string, textStyle: TextStyle) => any
  readonly id: string
  text: string
  style: TextStyle
  order: number
  after?: Orderable
  before?: Orderable
  target: Point
  alignment: 'left' | 'center' | 'right' | 'justify' = 'left'
  lineHeight: number = 0
  /** @internal */ eventHandler: IEventHandler = new EventHandlerBag()

  constructor (text: string, style: TextStyle, order: number = 0, measure?: (text: string, style: TextStyle) => any) {
    this.id = uid()
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

  get transform () {
    return this.#transform
  }

  injectTransform (transform: Matrix2D) {
    this.#transform = transform
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

  inPath (p: Point): boolean {
    return this.bounds.intersectsPoint(p)
  }

  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | TextBlock {
    this.eventHandler.add(this, type, listener)
    return this
  }

  off<K extends keyof EventType> (type: K): this | TextBlock {
    this.eventHandler.remove(this, type)
    return this
  }
}
