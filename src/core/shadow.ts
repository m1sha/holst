import { Color } from './color'
import { IPoint, Point } from './point'

export class Shadow {
  point: IPoint | null = null
  blur: number | null = null
  color: string | Color | null = null

  set (point: IPoint, blur: number, color: string | Color) {
    this.point = point
    this.blur = blur
    this.color = color
  }

  clear () {
    this.point = null
    this.blur = null
    this.color = null
  }

  has () {
    return Boolean(this.color)
  }

  values () {
    const { x, y } = this.point ?? Point.zero
    const blur = this.blur ?? 0
    return { x, y, blur, color: this.color!! }
  }
}
