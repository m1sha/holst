import { LabelStyle } from './label-style'

export interface Label {
  text: string,
  x: (textWidth: number) => number,
  y: (textWidth: number) => number,
  style: LabelStyle
}
