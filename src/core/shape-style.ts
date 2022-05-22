/* global CanvasLineCap, CanvasLineJoin */

import { Color } from './color'

/* eslint no-undef: "error" */
export interface ShapeStyle {
  lineCap?: CanvasLineCap
  lineDashOffset?: number
  lineDash?: number[]
  lineJoin?: CanvasLineJoin
  lineWidth?: number
  miterLimit?: number
  fillStyle?: string | CanvasGradient | CanvasPattern | Color
  strokeStyle?: string | CanvasGradient | CanvasPattern | Color
}

export class ShapeStyleImpl {
  #onSetDelegate: () => void
  #lineCap?: CanvasLineCap
  #lineDashOffset?: number
  #lineDash?: number[]
  #lineJoin?: CanvasLineJoin
  #lineWidth?: number
  #miterLimit?: number
  #fillStyle?: string | CanvasGradient | CanvasPattern | Color
  #strokeStyle?: string | CanvasGradient | CanvasPattern | Color

  get lineCap (): CanvasLineCap | undefined {
    return this.#lineCap
  }

  set lineCap (value: CanvasLineCap | undefined) {
    this.#onSetDelegate()
    this.#lineCap = value
  }

  get lineDashOffset (): number | undefined {
    return this.#lineDashOffset
  }

  set lineDashOffset (value: number | undefined) {
    this.#onSetDelegate()
    this.#lineDashOffset = value
  }

  get lineDash (): number[] | undefined {
    return this.#lineDash
  }

  set lineDash (value: number[] | undefined) {
    this.#onSetDelegate()
    this.#lineDash = value
  }

  get lineJoin (): CanvasLineJoin | undefined {
    return this.#lineJoin
  }

  set lineJoin (value: CanvasLineJoin | undefined) {
    this.#onSetDelegate()
    this.#lineJoin = value
  }

  get lineWidth (): number | undefined {
    return this.#lineWidth
  }

  set lineWidth (value: number | undefined) {
    this.#onSetDelegate()
    this.#lineWidth = value
  }

  get miterLimit (): number | undefined {
    return this.#miterLimit
  }

  set miterLimit (value: number | undefined) {
    this.#onSetDelegate()
    this.#miterLimit = value
  }

  get fillStyle () : string | CanvasGradient | CanvasPattern | Color | undefined {
    return this.#fillStyle
  }

  set fillStyle (value: string | CanvasGradient | CanvasPattern | Color | undefined) {
    this.#onSetDelegate()
    this.#fillStyle = value
  }

  get strokeStyle () : string | CanvasGradient | CanvasPattern | Color | undefined {
    return this.#strokeStyle
  }

  set strokeStyle (value: string | CanvasGradient | CanvasPattern | Color | undefined) {
    this.#onSetDelegate()
    this.#strokeStyle = value
  }

  constructor (style: ShapeStyle, onSetDelegate: () => void) {
    this.#onSetDelegate = onSetDelegate
    this.#lineCap = style.lineCap ?? 'butt'
    this.#lineDashOffset = style.lineDashOffset ?? 0
    this.#lineDash = style.lineDash ?? []
    this.#lineJoin = style.lineJoin ?? 'bevel'
    this.#lineWidth = style.lineWidth ?? 1
    this.#miterLimit = style.miterLimit
    this.#fillStyle = style.fillStyle ? this.getStyle(style.fillStyle) : undefined
    this.#strokeStyle = style.strokeStyle ? this.getStyle(style.strokeStyle) : undefined
  }

  clone (): ShapeStyle {
    return {
      lineCap: this.#lineCap,
      lineDashOffset: this.#lineDashOffset,
      lineDash: this.#lineDash,
      lineJoin: this.#lineJoin,
      lineWidth: this.#lineWidth,
      miterLimit: this.#miterLimit,
      fillStyle: this.#fillStyle,
      strokeStyle: this.#strokeStyle
    }
  }

  private getStyle (style: string | CanvasGradient | CanvasPattern | Color): string | CanvasGradient | CanvasPattern {
    return style instanceof Color ? style.toString() : style
  }
}
