import { Padding } from './padding'
import { Point } from './point'
import { Rect } from './rect'

export default class metric {
  static getRatio (thickness: {maxWidth: number, maxHeight: number, minHeight: number, minWidth: number}, bounds: Rect, padding?: Padding): Point {
    const width = bounds.width
    const height = bounds.height
    return {
      x: width / (thickness.maxWidth + thickness.minWidth),
      y: height / (thickness.maxHeight + Math.abs(thickness.minHeight))
    }
  }
}
