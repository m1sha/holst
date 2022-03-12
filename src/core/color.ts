import utils from '../tools/color-utils'
export class Color {
  readonly r: number = 0
  readonly g: number = 0
  readonly b: number = 0
  readonly a: number = 1

  constructor ()
  constructor (r: number, g: number, b: number, a?: number)
  constructor (hex: string)
  constructor (hsv: HSV)
  constructor (hsl: HSL)
  constructor (...args: Array<any>) {
    if (!args || !args.length) return
    if (typeof args[0] === 'string') {
      const { r, g, b } = utils.hex2rgb(args[0])
      this.r = r
      this.g = g
      this.b = b
      return
    }

    if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      this.r = args[0]
      this.g = args[1]
      this.b = args[2]
      this.a = typeof args[3] === 'number' ? args[3] : 1
      return
    }

    if (args[0] instanceof HSV) {
      const { r, g, b } = utils.hsv2rgb(args[0].h, args[0].s, args[0].v)
      this.r = r
      this.g = g
      this.b = b
      return
    }

    if (args[0] instanceof HSL) {
      const { r, g, b } = utils.hsl2rgb(args[0].h, args[0].s, args[0].l)
      this.r = r
      this.g = g
      this.b = b
      return
    }

    throw new Error('Has been not found suitable signature')
  }

  toString () {
    let r = this.r.toString(16)
    r = r.length === 1 ? '0' + r : r
    let g = this.g.toString(16)
    g = g.length === 1 ? '0' + g : g
    let b = this.b.toString(16)
    b = b.length === 1 ? '0' + b : b
    return `#${r}${g}${b}`
  }

  toHSV () {
    const { h, s, v } = utils.rgb2hsv(this.r, this.g, this.b)
    return new HSV(Math.floor(Math.round(h)), Math.floor(s * 100), Math.floor(v * 100))
  }

  static readonly black = new Color('#000000')
  static readonly white = new Color('#ffffff')
  static readonly red = new Color('#ff0000')
  static readonly green = new Color('#00ff00')
  static readonly blue = new Color('#0000ff')
}

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
}

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