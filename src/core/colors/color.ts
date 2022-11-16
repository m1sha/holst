import { hsl2rgb } from './converters/hsl-2-rgb'
import { hsv2rgb } from './converters/hsv-2-rgb'
import { rgb2hsv } from './converters/rgb-2-hsv'
import { str2rgba } from './converters/str-2-rgba'
import { HSV } from './hsv'
import { HSL } from './hsl'
import { int2rgb } from './converters/int-2-rgb'
import { rgb2int } from './converters/rgb-2-int'
import { rgb2str } from './converters/rgb-2-str'
import { contrastRatio } from './funcs/contrast-ratio'
import { distance } from './funcs/distance'
import { IPixel } from './pixel'
import { invert } from './funcs/invert'
import { rgb2floatArray } from './converters/rgb-2-float-array'
import { colorFromGradient } from './funcs/color-from-gradient'

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
      this.set(str2rgba(args[0]))
      return
    }

    if (args.length === 1 && typeof args[0] === 'number') {
      this.set(int2rgb(args[0]))
      return
    }

    if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
      this.set(typeof args[3] === 'number' ? args : [...args, 1])
      return
    }

    if (args[0] instanceof HSV) {
      this.set(hsv2rgb(args[0].h, args[0].s, args[0].v))
      return
    }

    if (args[0] instanceof HSL) {
      this.set(hsl2rgb(args[0].h, args[0].s, args[0].l))
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

  get value (): number {
    return rgb2int(this.r, this.g, this.b)
  }

  invert (): this {
    this.set(invert(this))
    return this
  }

  getContrastRatio (color: Color, foreground?: boolean): number {
    return contrastRatio(this, color, foreground)
  }

  alike (c: IPixel, coefficient: number = 10): boolean {
    return this.distance(c) < coefficient
  }

  distance (color: Color | IPixel): number {
    return distance(this, color)
  }

  toString () {
    return rgb2str(this.r, this.g, this.b, this.a)
  }

  toHSV () {
    const { h, s, v } = rgb2hsv(this.r, this.g, this.b)
    return new HSV(Math.floor(Math.round(h)), Math.floor(s * 100), Math.floor(v * 100))
  }

  toFloatArray (): [number, number, number, number] {
    return rgb2floatArray(this)
  }

  static readonly black = new Color('#000000')
  static readonly lightGrey = new Color('#d8d8d8')
  static readonly darkGrey = new Color('#484848')
  static readonly white = new Color('#ffffff')
  static readonly red = new Color('#ff0000')
  static readonly green = new Color('#00ff00')
  static readonly blue = new Color('#0000ff')
  static readonly maroon = new Color('#800000')
  static readonly yellow = new Color('#ffff00')
  static readonly darkGreen = new Color('#008000')
  static readonly orange = new Color('#ff5b2f')
  static readonly brown = new Color('#873600')
  static readonly darkBlue = new Color('#000080')
  static readonly lightBlue = new Color('#00ffff')
  static readonly pink = new Color('#ff00ff')
  static readonly purple = new Color('#800080')
  static readonly teal = new Color('#008080')

  static fromGradient (value: number, colors: (Color | string)[]): Color {
    return colorFromGradient(value, colors)
  }

  private set (arr: number[]) {
    this.r = arr[0]
    this.g = arr[1]
    this.b = arr[2]
    this.a = arr[3]
  }
}
