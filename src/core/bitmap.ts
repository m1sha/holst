import Orderable from './orderable'

export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap
export class Bitmap implements Orderable {
  src: AnyImageType
  sx: number
  sy: number
  sWidth?: number
  sHeight?: number
  dx?: number
  dy?: number
  dWidth?: number
  dHeight?: number
  order: number = 0

  constructor (src: AnyImageType, sx: number, sy: number, sWidth?: number, sHeight?: number, dx?: number, dy?: number, dWidth?: number, dHeight?: number) {
    this.src = src
    this.sx = sx
    this.sy = sy
    this.sWidth = sWidth
    this.sHeight = sHeight
    this.dx = dx
    this.dy = dy
    this.dWidth = dWidth
    this.dHeight = dHeight
  }

  static createImage (url: string, callback?: (ev: Event) => void, onerror?: (ev: string | Event) => void) {
    const img = new Image()
    img.src = url
    if (callback) img.onload = ev => callback(ev)
    if (onerror) img.onerror = ev => onerror(ev)
    return new Bitmap(img, 0, 0)
  }
}
export type Images = Bitmap[]
