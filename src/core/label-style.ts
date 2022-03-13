import { Color } from './color'

export interface TextStyle {
  color?: string | Color
  fontName?: string
  fontSize?: string
  bold? : boolean
  italic?: boolean
}
