type BitmapData = {
  readonly data: Uint8ClampedArray
  readonly height: number
  readonly width: number
}

type RGBA = {
  r: number
  g: number
  b: number
  a: number
}

export class BitmapWriter {
  private data: Uint8ClampedArray
  readonly width: number
  readonly height: number

  constructor ({ data, width, height }: BitmapData) {
    this.data = data
    this.width = width
    this.height = height
  }

  write (rgba: RGBA, index: number) {
    this.data[index] = rgba.r
    this.data[index + 1] = rgba.g
    this.data[index + 2] = rgba.b
    this.data[index + 3] = rgba.a
  }
}
