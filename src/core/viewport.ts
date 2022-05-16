import { Size } from './size'
import { Matrix2D } from './matrix'
import { IRect } from './rect'

export class Viewport implements IRect {
  private size: Size
  transform: Matrix2D

  constructor (x: number, y: number, width: number, height: number) {
    this.size = { width, height }
    this.transform = Matrix2D.identity
    this.transform.f = x
    this.transform.e = y
  }

  get x () {
    return this.transform.f
  }

  set x (value: number) {
    this.transform.f = value
  }

  get y () {
    return this.transform.e
  }

  set y (value: number) {
    this.transform.e = value
  }

  get width () {
    return this.size.width
  }

  get height () {
    return this.size.height
  }

  get scale () {
    return this.transform.a
  }

  set scale (value: number) {
    this.transform.a = value
    this.transform.d = value
  }
}
