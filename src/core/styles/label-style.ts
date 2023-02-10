import { GraphicStyle } from './graphic-style'
import { FillStrokeOrder } from './fill-stroke-order'
import { Shadow } from './shadow'
import { internal } from '../../utils/internal'
import { IChangePropertyProvider } from '../change-property-provider'

export type FontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type FontVariant = 'normal' | 'small-caps'
export interface TextStyle {
  color?: GraphicStyle
  outlineColor?: GraphicStyle
  outlineWidth?: number
  fontName?: string
  fontSize?: string
  bold? : boolean | FontWeight
  italic?: boolean
  fontVariant?: FontVariant
  fillStrokeOrder?: FillStrokeOrder
  readonly shadow?: Shadow
}

export class TextStyleImpl implements TextStyle {
  #onSetDelegate: () => void
  #color?: GraphicStyle
  #outlineColor?: GraphicStyle
  #outlineWidth?: number
  #fontName?: string
  #fontSize?: string
  #bold? : boolean | FontWeight
  #italic?: boolean
  #fontVariant?: FontVariant
  #fillStrokeOrder?: FillStrokeOrder
  #shadow?: Shadow

  constructor (style: TextStyle, onSetDelegate: () => void) {
    this.#onSetDelegate = onSetDelegate
    this.#color = style.color ? style.color : '#212121'
    this.#outlineColor = style.outlineColor ? style.outlineColor : 'transparent'
    this.#outlineWidth = style.outlineWidth ? style.outlineWidth : 1
    this.#fontName = style.fontName ? style.fontName : 'serif'
    this.#fontSize = style.fontSize ? style.fontSize : '12px'
    this.#bold = style.bold ? style.bold : 'normal'
    this.#italic = style.italic ? style.italic : false
    this.#fontVariant = style.fontVariant ? style.fontVariant : 'normal'
    this.#fillStrokeOrder = style.fillStrokeOrder ? style.fillStrokeOrder : 'fill-first'
    this.#shadow = style.shadow
    this.setShadowChangeProperty(style.shadow)
  }

  get color (): GraphicStyle {
    return this.#color!
  }

  set color (value: GraphicStyle | undefined) {
    if (!value) this.#color = '#212121'
    else this.#color = value
    this.#onSetDelegate()
  }

  get outlineColor (): GraphicStyle {
    return this.#outlineColor!
  }

  set outlineColor (value: GraphicStyle | undefined) {
    if (!value) this.#outlineColor = 'transparent'
    else this.#outlineColor = value
    this.#onSetDelegate()
  }

  get outlineWidth (): number {
    return this.#outlineWidth!
  }

  set outlineWidth (value: number) {
    this.#outlineWidth = value
    this.#onSetDelegate()
  }

  get fontName (): string {
    return this.#fontName!
  }

  set fontName (value: string) {
    this.#fontName = value ?? 'serif'
    this.#onSetDelegate()
  }

  get fontSize (): string {
    return this.#fontSize!
  }

  set fontSize (value: string) {
    this.#fontSize = value ?? '12px'
    this.#onSetDelegate()
  }

  get bold (): boolean | FontWeight {
    return this.#bold!
  }

  set bold (value: boolean | FontWeight) {
    this.#bold = value
    this.#onSetDelegate()
  }

  get italic (): boolean {
    return this.#italic!
  }

  set italic (value: boolean) {
    this.#italic = value
    this.#onSetDelegate()
  }

  get fontVariant (): FontVariant {
    return this.#fontVariant!
  }

  set fontVariant (value: FontVariant) {
    this.#fontVariant = value
    this.#onSetDelegate()
  }

  get fillStrokeOrder (): FillStrokeOrder {
    return this.#fillStrokeOrder!
  }

  set fillStrokeOrder (value: FillStrokeOrder) {
    this.#fillStrokeOrder = value
    this.#onSetDelegate()
  }

  get shadow (): Shadow | undefined {
    return this.#shadow
  }

  set shadow (value: Shadow | undefined) {
    this.#shadow = value
    this.setShadowChangeProperty(this.#shadow)
  }

  clone (): TextStyle {
    return {
      color: this.#color,
      outlineColor: this.#outlineColor,
      outlineWidth: this.#outlineWidth,
      fontName: this.#fontName,
      fontSize: this.#fontSize,
      bold: this.#bold,
      italic: this.#italic,
      fontVariant: this.#fontVariant,
      fillStrokeOrder: this.#fillStrokeOrder,
      shadow: this.#shadow
    }
  }

  private setShadowChangeProperty (value: Shadow | undefined) {
    if (!value) return
    internal<IChangePropertyProvider>(value).onChangeProperty = () => {
      this.#onSetDelegate()
    }
  }
}
