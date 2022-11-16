export class Pixel {
  r: number = 0
  g: number = 0
  b: number = 0

  constructor (r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }

  toArray () {
    return [this.r, this.g, this.b]
  }

  static from (array: number[]) {
    if (!array || array.length !== 3) throw new Error('The array must have 3 elements')
    return new Pixel(array[0], array[1], array[2])
  }
}
