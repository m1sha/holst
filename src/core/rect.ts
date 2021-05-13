import { Point } from './point'
import { Size } from './size'

export interface Rect extends Point, Size {
  x: number
  y: number
  width: number
  height: number
}
