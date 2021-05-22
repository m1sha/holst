import { Point } from './point'
import { Rect } from './rect'

const rect = (x: number, y: number, width: number, height: number): Rect => {
  return { x, y, width, height }
}

const point = (x: number, y: number): Point => {
  return { x, y }
}

export { rect, point }
