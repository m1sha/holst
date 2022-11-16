export class HSV {
  h: number
  s: number
  v: number
  a: number
  constructor (h: number, s: number, v: number, a?: number) {
    this.h = h
    this.s = s
    this.v = v
    this.a = a === undefined ? 1 : a
  }

  toString () {
    return `hsv(${this.h}, ${this.s}%, ${this.v}%)`
  }
}
