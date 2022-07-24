import { linearGradient } from './colors/linear-gradient'
import utils from '../utils/color-utils'

type RGBA = { r: number, g: number, b: number, a: number }
export class Color {
  private _r: number = 0
  private _g: number = 0
  private _b: number = 0
  private _a: number = 1

  constructor ()
  constructor (v: number)
  constructor (r: number, g: number, b: number, a?: number)
  constructor (hex: string)
  constructor (hsv: HSV)
  constructor (hsl: HSL)
  constructor (...args: Array<any>) {
    if (!args || !args.length) return
    if (typeof args[0] === 'string') {
      const { r, g, b } = utils.fromString(args[0])
      this.r = r
      this.g = g
      this.b = b
      return
    }

    if (args.length === 1 && typeof args[0] === 'number') {
      this.r = (args[0] >> 16) & 0xff
      this.g = (args[0] >> 8) & 0xff
      this.b = args[0] & 0xff
      this.a = 1
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

  get r () {
    return this._r
  }

  set r (value: number) {
    if (value === undefined) throw new Error('value is undefined')
    if (value < 0 || value > 255) throw new Error('value is unsupported')
    this._r = value
  }

  get g () {
    return this._g
  }

  set g (value: number) {
    if (value === undefined) throw new Error('value is undefined')
    if (value < 0 || value > 255) throw new Error('value is unsupported')
    this._g = value
  }

  get b () {
    return this._b
  }

  set b (value: number) {
    if (value === undefined) throw new Error('value is undefined')
    if (value < 0 || value > 255) throw new Error('value is unsupported')
    this._b = value
  }

  get a () {
    return this._a
  }

  set a (value: number) {
    if (value === undefined) throw new Error('value is undefined')
    if (value < 0 || value > 1) throw new Error('value is unsupported')
    this._a = value
  }

  get value () {
    let rgb = this.r
    rgb = (rgb << 8) + this.g
    rgb = (rgb << 8) + this.b
    return rgb
  }

  get invert () {
    return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a)
  }

  getContrastRatio (color: Color, foreground?: boolean): number {
    const l1 = this.getContrast(this)
    const l2 = this.getContrast(color)
    return foreground ? (l2 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l2 + 0.05)
  }

  alike ({ r, g, b }: RGBA, coefficient: number = 10): boolean {
    const er = r <= this.r + coefficient && r >= this.r - coefficient
    const eg = g <= this.g + coefficient && g >= this.g - coefficient
    const eb = b <= this.b + coefficient && b >= this.b - coefficient
    return er && eg && eb
  }

  toString () {
    let r = this.r.toString(16)
    r = r.length === 1 ? '0' + r : r
    let g = this.g.toString(16)
    g = g.length === 1 ? '0' + g : g
    let b = this.b.toString(16)
    b = b.length === 1 ? '0' + b : b
    return this.a === 1 ? `#${r}${g}${b}` : `rgba(${r},${g},${b},${this.a})`
  }

  toHSV () {
    const { h, s, v } = utils.rgb2hsv(this.r, this.g, this.b)
    return new HSV(Math.floor(Math.round(h)), Math.floor(s * 100), Math.floor(v * 100))
  }

  private getContrast (color: Color) {
    const { r, g, b } = color
    const f = (c: number): number => c < 11 ? c / 255 / 12.92 : Math.pow(((c / 255 + 0.055) / 1.055), 2.4)
    const l = 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
    return l
  }

  static readonly black = new Color('#000000')
  static readonly lightGrey = new Color('#d8d8d8')
  static readonly darkGrey = new Color('#484848')
  static readonly white = new Color('#ffffff')
  static readonly red = new Color('#ff0000')
  static readonly green = new Color('#00ff00')
  static readonly blue = new Color('#0000ff')

  static fromGradient (value: number, colors: (Color | string)[]) {
    const r = linearGradient(colors.map(p => {
      if (p instanceof Color) return p.toFloatArray()
      return new Color(p).toFloatArray()
    }), value)
    return new Color(Math.floor(r[0] * 255), Math.floor(r[1] * 255), Math.floor(r[2] * 255), r[3])
  }

  private toFloatArray (): [number, number, number, number] {
    return [this.r / 255, this.g / 255, this.b / 255, this.a]
  }
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

  toString () {
    return `hsv(${this.h}, ${this.s}%, ${this.v}%)`
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
