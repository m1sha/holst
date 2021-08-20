import { TextStyle } from './label-style'

export interface Text {
  value: string,
  x: (textWidth: number) => number,
  y: (textWidth: number) => number,
  style: TextStyle
}
