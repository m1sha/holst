import { RasterDataTransfer } from './raster/raster-data-transfer'
import { IRect, Rect } from './geometry/rect'
import { Channels } from './raster/channels'
import { Drawable, DrawableType } from './drawable'
import { UseFilters } from './raster/filters/use-filters'
import { Point } from './geometry/point'

export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap

export class Raster extends Container implements Orderable, Drawable {
  readonly filters: UseFilters
  readonly type: DrawableType = 'raster'
  hidden: boolean = false
  name: string
  readonly id: string
  #channels: Channels | null = null
  src: AnyImageType
  srcRect: IRect
  distRect: IRect

  constructor (src: AnyImageType, srcRect: IRect, distRect: IRect, order: number = 0) {
    super(order)
    this.src = src
    this.srcRect = srcRect
    this.distRect = distRect
    this.filters = new UseFilters(this)
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

  getData (): ImageData {
    return RasterDataTransfer.read(this.src, this.distRect)
  }

  setData (imagedata: ImageData) {
    const img = RasterDataTransfer.write(imagedata)
    this.src = img
  }

  get channels (): Channels {
    if (this.#channels) return this.#channels
    this.#channels = new Channels(this.getData())
    return this.#channels
  }

  clone () {
    return new Raster(this.src, this.srcRect, this.distRect)
  }

  getType (): DrawableType {
    return 'raster'
  }

  inPath (p: Point): boolean {
    return this.bounds.intersectsPoint(p)
  }
}
export type Images = Raster[]
