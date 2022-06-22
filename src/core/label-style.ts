import { Color } from './color'

export type FontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface TextStyle {
  color?: string | Color
  fontName?: string
  fontSize?: string
  bold? : boolean | FontWeight
  italic?: boolean
}
