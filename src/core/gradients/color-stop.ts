import { Color } from '../colors/color'

export interface ColorStop {
  offset: number
  color: Color | string
}
