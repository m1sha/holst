import { Color } from '../colors/color'
import { IPoint, Point } from '../geometry/point'

export class Shadow {
  protected onChangeProperty: (() => void) | null = null
  #point: IPoint | null = null
  #blur: number | null = null
  #color: string | Color | null = null

  constructor (point?: IPoint, blur?: number, color?: string | Color) {
    if (point) this.#point = point
    if (blur) this.#blur = blur
    if (color) this.#color = color
  }

  get point (): Readonly<IPoint> | null {
    return this.point
  }

  set point (value: IPoint | null) {
    this.point = value
    if (this.onChangeProperty) this.onChangeProperty()
  }

  get blur (): number | null {
    return this.#blur
  }

  set blur (value: number | null) {
    this.#blur = value
    if (this.onChangeProperty) this.onChangeProperty()
  }

  get color (): string | Color | null {
    return this.#color
  }

  set color (value: string | Color | null) {
    this.#color = value
    if (this.onChangeProperty) this.onChangeProperty()
  }

  set (point: IPoint, blur: number, color: string | Color) {
    this.#point = point
    this.#blur = blur
    this.#color = color
    if (this.onChangeProperty) this.onChangeProperty()
  }

  values () {
    const { x, y } = this.#point ?? Point.zero
    const blur = this.#blur ?? 0
    return { x, y, blur, color: this.#color!! }
  }
}
