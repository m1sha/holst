import { Rect } from '../../rect'
import { TextStyle } from '../../label-style'

export class Cell {
  content: unknown = null
  width: number = 0
  alignment: 'left' | 'center' = 'left'
  vAlignment: 'top' | 'middle' | 'bottom' = 'top'
  bounds: Rect | null = null
  hidden: boolean = false
  textStyle: TextStyle | null = null
}
