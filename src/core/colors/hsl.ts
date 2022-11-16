export class HSL {
  h: number
  s: number
  l: number
  a: number
  constructor (h: number, s: number, l: number, a?: number) {
    this.h = h
    this.s = s
    this.l = l
    this.a = a === undefined ? 1 : a
  }
}
