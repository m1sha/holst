/* global CanvasLineCap, CanvasLineJoin */

import { Color } from '../colors/color'
import { GraphicStyle } from './graphic-style'
import { FillStrokeOrder } from './fill-stroke-order'
import { Shadow } from './shadow'
import { internal } from '../../utils/internal'
import { IChangePropertyProvider } from '../change-property-provider'

/* eslint no-undef: "error" */
export interface ShapeStyle {
  lineCap?: CanvasLineCap
  lineDashOffset?: number
  lineDash?: number[]
  lineJoin?: CanvasLineJoin
  lineWidth?: number
  miterLimit?: number
  fill?: GraphicStyle
  stroke?: GraphicStyle
  fillStrokeOrder?: FillStrokeOrder
  readonly shadow?: Shadow
}

export class ShapeStyleImpl {
  #onSetDelegate: () => void
  #lineCap?: CanvasLineCap
  #lineDashOffset?: number
  #lineDash?: number[]
  #lineJoin?: CanvasLineJoin
  #lineWidth?: number
  #miterLimit?: number
  #fill?: GraphicStyle
  #stroke?: GraphicStyle
  #fillStrokeOrder?: FillStrokeOrder
  #shadow?: Shadow

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

  get fill () : GraphicStyle | undefined {
    return this.#fill
  }

  set fill (value: GraphicStyle | undefined) {
    this.#onSetDelegate()
    this.#fill = value
  }

  get stroke () : GraphicStyle | undefined {
    return this.#stroke
  }

  set stroke (value: GraphicStyle | undefined) {
    this.#onSetDelegate()
    this.#stroke = value
  }

  get fillStrokeOrder (): FillStrokeOrder | undefined {
    return this.#fillStrokeOrder
  }

  set fillStrokeOrder (value: FillStrokeOrder | undefined) {
    this.#onSetDelegate()
    this.#fillStrokeOrder = value
  }

  get shadow (): Shadow | undefined {
    return this.#shadow
  }

  set shadow (value: Shadow | undefined) {
    this.#shadow = value
    this.setShadowChangeProperty(this.#shadow)
  }

  constructor (style: ShapeStyle, onSetDelegate: () => void) {
    this.#onSetDelegate = onSetDelegate
    this.#lineCap = style.lineCap ?? 'butt'
    this.#lineDashOffset = style.lineDashOffset ?? 0
    this.#lineDash = style.lineDash ?? []
    this.#lineJoin = style.lineJoin ?? 'bevel'
    this.#lineWidth = style.lineWidth ?? 1
    this.#miterLimit = style.miterLimit
    this.#fill = style.fill ? this.getStyle(style.fill) : undefined
    this.#stroke = style.stroke ? this.getStyle(style.stroke) : undefined
    this.#fillStrokeOrder = style.fillStrokeOrder ?? 'stroke-first'
    this.#shadow = style.shadow
    this.setShadowChangeProperty(style.shadow)
  }

  clone (): ShapeStyle {
    return {
      lineCap: this.#lineCap,
      lineDashOffset: this.#lineDashOffset,
      lineDash: this.#lineDash,
      lineJoin: this.#lineJoin,
      lineWidth: this.#lineWidth,
      miterLimit: this.#miterLimit,
      fill: this.#fill,
      stroke: this.#stroke,
      fillStrokeOrder: this.#fillStrokeOrder,
      shadow: this.#shadow
    }
  }

  private getStyle (style: GraphicStyle): GraphicStyle {
    return style instanceof Color ? style.toString() : style
  }

  private setShadowChangeProperty (value: Shadow | undefined) {
    if (!value) return
    internal<IChangePropertyProvider>(value).onChangeProperty = () => {
      this.#onSetDelegate()
    }
  }
}
