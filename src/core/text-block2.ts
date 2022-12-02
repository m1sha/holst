import { TextStyle } from './styles/label-style'
import { Drawable, DrawableType } from './drawable'
import { IPoint, Point } from './geometry/point'
import { Rect } from './geometry/rect'
import { Size } from './geometry/size'
import { TextMeasurer } from './text-measurer'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'
export type TextVerticalAlignment = 'top' | 'center' | 'bottom'
export type Baseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
export type Overflow = 'none' | 'word-break' | 'clip' | 'word-break + clip'
export type TextMeasure = (text: string, style: TextStyle) => any

export interface TextLine {
  readonly text: string
  width: () => number
}

export interface TextChunk {
  readonly text: string
  readonly bounds: Rect
}

export class TextBlock2 extends Drawable {
  private measure: ((text: string) => any)
  #style: TextStyle
  #position: IPoint
  #size?: Size
  #text: string
  #overflow: Overflow = 'none'
  #lineHeight: number = 0
  #alignment: TextAlignment = 'left'
  #verticalAlignment: TextVerticalAlignment = 'top'
  #baseline: Baseline = 'alphabetic'

  constructor (text: string, textStyle: TextStyle, position: IPoint, order: number, measureFactory?: TextMeasure) {
    super(order)
    this.#position = position
    this.#text = text
    this.#style = textStyle
    const measure = measureFactory ?? ((text, style) => TextMeasurer.measureText(text, style))
    this.measure = text => measure(text, this.#style)
  }

  get lines (): TextLine[] {
    if (!this.#text) return []

    return this.#text.split('\n')
      .map(line => ({
        text: line,
        width: () => this.measure(line).width
      }))
  }

  get computedLines (): TextLine[] {
    const result: TextLine[] = []
    const lines = this.lines
    for (let i = 0; i < lines.length; i++) {
      // const line = lines[i]
    }
    return result
  }

  get computedSize (): Size {
    const lines = this.computedLines
    const rowHeight = this.getRowHeight()
    return {
      width: Math.max.apply(null, lines.map(p => p.width())),
      height: lines.length * (rowHeight + this.#lineHeight) - rowHeight
    }
  }

  get style () { return this.#style }

  get bounds (): Rect {
    return new Rect(this.#position, this.computedSize)
  }

  inPath (p: Point): boolean {
    const rect = this.bounds
    if (this.anchor && this.anchor.container) {
      rect.x += this.anchor.container.bounds.x
      rect.y += this.anchor.container.bounds.y
    }
    return rect.intersectsPoint(p)
  }

  getType (): DrawableType { return 'text' }

  private getChunks (): TextChunk[] {
    return []
  }

  private getRowHeight (line?: string): number {
    const result = this.measure(line || this.#text).width
    if (result.actualBoundingBoxAscent && result.actualBoundingBoxDescent) {
      return result.actualBoundingBoxAscent + result.actualBoundingBoxDescent
    }

    return Math.max(this.getRowWidth('M'), this.getRowWidth('g'))
  }

  private getRowWidth (line: string): number {
    return this.measure(line).width
  }

  static create (text: string, style: TextStyle, position?: IPoint) {
    return new TextBlock2(text, style, position ?? Point.zero, 0)
  }
}

// function getAlignmentPosition (dx: number, { alignment, width, size }: TextBlock2, line: TextLine) {
//   const x = dx
//   const realWidth = size ? size.width : width
//   switch (alignment) {
//     case 'left': return x
//     case 'center': return x + realWidth / 2 - line.width() / 2
//     case 'right': return x + realWidth - line.width()
//     case 'justify': return x
//   }
// }

// function getVerticalAlignmentPosition (block: TextBlock2) {
//   if (!block.size) return 0
//   if (block.verticalAlignment === 'top') return 0
//   if (block.verticalAlignment === 'bottom') return block.size.height - block.height
//   if (block.verticalAlignment === 'center') return (block.size.height / 2) - (block.height / 2)
//   return 0
// }

// function makeLineJustify (ctx: CanvasRenderingContext2D, { width, style, size }: TextBlock, line: TextBlockLine, x: number, y: number) {
//   const realWidth = size ? size.width : width
//   if (realWidth === line.getWidth()) {
//     drawText(ctx, style, line.text, x, y)
//     return
//   }

//   const textBlock = new TextBlock(line.text.replaceAll(' ', '\n'), style)
//   const fullTextLen = textBlock.lines.reduce((a, b) => a + b.getWidth(), 0)
//   const dx = (realWidth - fullTextLen) / textBlock.lines.length
//   let sx = x
//   for (const l of textBlock.lines) {
//     ctx.fillText(l.text, sx, y)
//     sx += l.getWidth() + dx + dx / (textBlock.lines.length - 1)
//   }
// }
