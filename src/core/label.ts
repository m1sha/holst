import { Matrix2D } from './matrix'
import { TextStyle } from './label-style'
import Orderable from './orderable'
import { EventType, Interactive } from './events/interactive'
import { Point, IPoint } from './point'
import { Rect } from './rect'
import { TextMeasurer } from './text-measurer'
import { uid } from '../tools/uid'
import { EventHandlerBag, IEventHandler } from './events/event-handler2'
import { Size } from './size'

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
  target: IPoint
  alignment: 'left' | 'center' | 'right' | 'justify' = 'left'
  baseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom' = 'alphabetic'
  size?: Size
  overflow: 'none' | 'word-break' | 'clip' | 'word-break + clip' = 'none'
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

  private findBreak (word: string, maxWidth: number, width : number) {
    // const charWidths = new CharacterWidths(w => this.getWidth(w))

    return {
      lines: [],
      remainder: 0
    }
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

// class CharacterWidths {
//   private chars: Record<string, number> = {}
//   private getWidth: (c: string) => number

//   constructor (getWidth: (c: string) => number) {
//     this.getWidth = getWidth
//   }

//   get (char: string) {
//     let w = this.chars[char]
//     if (w) return w
//     w = this.chars[char] = this.getWidth(char)
//     return w
//   }
// }
