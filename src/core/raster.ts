import { RasterDataTransfer } from './raster/raster-data-transfer'
import Orderable from './orderable'
import { IRect, Rect } from './rect'
import { Channels } from './raster/channels'
import { uid } from '../utils/uid'
import { Drawable, DrawableType } from './drawable'
import { Container } from './container'

export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap
export class Raster extends Container implements Orderable, Drawable {
  readonly type: DrawableType = 'raster'
  hidden: boolean = false
  name: string
  readonly id: string
  #channels: Channels | null = null
  src: AnyImageType
  srcRect: IRect
  distRect: IRect
  order: number = 0
  readonly modified: boolean = true
  onModified: (() => void) | null = null

  constructor (src: AnyImageType, srcRect: IRect, distRect: IRect) {
    super()
    this.id = uid()
    this.name = 'Raster'
    this.src = src
    this.srcRect = srcRect
    this.distRect = distRect
  }

  get bounds (): Rect {
    return new Rect(this.distRect)
  }

  static createImage (url: string, callback?: (ev: Event) => void, onerror?: (ev: string | Event) => void) {
    const img = new Image()
    const srcRect = new Rect(0, 0, 0, 0)
    const distRect = new Rect(0, 0, 0, 0)
    img.src = url
    if (callback) {
      img.onload = ev => {
        srcRect.width = img.naturalWidth
        srcRect.height = img.naturalHeight
        distRect.width = img.naturalWidth
        distRect.height = img.naturalHeight
        callback(ev)
      }
    }
    if (onerror) img.onerror = ev => onerror(ev)
    return new Raster(img, srcRect, distRect)
  }

  getData () {
    return RasterDataTransfer.read(this.src, this.distRect)
  }

  setData (imagedata: ImageData) {
    const img = RasterDataTransfer.write(imagedata)
    this.src = img
  }

  get channels () {
    if (this.#channels) return this.#channels
    this.#channels = new Channels(this.getData())
    return this.#channels
  }
}
export type Images = Raster[]
