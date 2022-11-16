import { Matrix3x3 } from '../../../../utils/matrix3x3'

export class Pixel {
  r: number = 0
  g: number = 0
  b: number = 0

  constructor (r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }

  mul (m: Matrix3x3): this {
    const r = this.r
    const g = this.g
    const b = this.b
    const nr = Math.floor(r * m.a11 + g * m.a12 + b * m.a13)
    const ng = Math.floor(r * m.a21 + g * m.a22 + b * m.a23)
    const nb = Math.floor(r * m.a31 + g * m.a32 + b * m.a33)
    this.r = nr + 16
    this.g = ng + 128
    this.b = nb + 128
    if (this.r > 255) this.r = 255
    if (this.r < 0) this.r = 0
    if (this.g > 255) this.g = 255
    if (this.g < 0) this.g = 0
    if (this.b > 255) this.b = 255
    if (this.b < 0) this.b = 0
    return this
  }

  toArray () {
    return [this.r, this.g, this.b]
  }

  static from (array: number[]) {
    if (!array || array.length !== 3) throw new Error('The array must have 3 elements')
    return new Pixel(array[0], array[1], array[2])
  }
}
