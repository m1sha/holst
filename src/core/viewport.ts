import { Size } from './size'
import { Matrix2D } from './matrix'
import { IRect } from './rect'

export class Viewport implements IRect {
  modified: boolean = false
  private size: Size
  transform: Matrix2D

  constructor (x: number, y: number, width: number, height: number) {
    this.size = { width, height }
    this.transform = Matrix2D.identity
    this.transform.e = x
    this.transform.f = y
  }

  get x () {
    return this.transform.e
  }

  set x (value: number) {
    this.transform.e = value
    this.modified = true
  }

  get y () {
    return this.transform.f
  }

  set y (value: number) {
    this.transform.f = value
    this.modified = true
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
    this.modified = true
  }
}
