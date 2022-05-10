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

export class BitmapReader {
  private data: Uint8ClampedArray
  readonly width: number
  readonly height: number

  constructor ({ data, width, height }: BitmapData) {
    this.data = data
    this.width = width
    this.height = height
  }

  read (f: (rgba: RGBA, index: number) => void) {
    const { data } = this
    for (let i = 0; i < length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]

      f({ r, g, b, a }, i)
    }
  }
}
