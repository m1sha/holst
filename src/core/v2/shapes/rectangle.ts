import { Rect } from '../../geometry/rect'
import { Shape } from './shape'

export class Rectangle extends Shape {
  #x: number
  #y: number
  #width: number
  #height: number

  constructor (x: number, y: number, width: number, height: number) {
    super()
    this.#x = x
    this.#y = y
    this.#width = width
    this.#height = height
  }

  get x (): number { return this.#x }

  set x (value: number) {
    this.#x = value
    this.propertyChanged()
  }

  get y (): number { return this.#y }

  set y (value: number) {
    this.#y = value
    this.propertyChanged()
  }

  get width (): number { return this.#width }

  set width (value: number) {
    this.#width = value
    this.propertyChanged()
  }

  get height (): number { return this.#height }

  set height (value: number) {
    this.#height = value
    this.propertyChanged()
  }

  get bounds (): Rect {
    return new Rect(this.#x, this.#y, this.#width, this.#height)
  }
}
