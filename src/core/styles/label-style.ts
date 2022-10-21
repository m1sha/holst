import { GraphicStyle } from './graphic-style'
import { FillStrokeOrder } from './fill-stroke-order'

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
}
