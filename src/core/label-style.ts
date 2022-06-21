import { Color } from './color'

export interface TextStyle {
  color?: string | Color
  fontName?: string
  fontSize?: string
  bold? : boolean | '400' | '500' | '600' | '700'
  italic?: boolean
}
