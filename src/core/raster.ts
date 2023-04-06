import { RasterDataTransfer } from './raster/raster-data-transfer'
import { IRect, Rect } from './geometry/rect'
import { Channels } from './raster/channels'
import { Drawable, DrawableType } from './drawable'
import { UseFilters } from './raster/filters/use-filters'
import { Point } from './geometry/point'
import { Matrix2D } from './matrix'
import { RasterCanvas } from './render/raster-canvas'
import { Color } from './colors/color'

export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap

export class Raster extends Drawable {
  readonly filters: UseFilters
  readonly type: DrawableType = 'raster'
  hidden: boolean = false
  #transform: Matrix2D = Matrix2D.identity
  #channels: Channels | null = null
  #canvas: RasterCanvas | null = null
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

  get originalBounds (): Rect {
    return new Rect(this.srcRect)
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

  combine (imagedata: ImageData, mask: Color) {
    const origin = this.getData()
    const img = RasterDataTransfer.combine(origin, imagedata, mask)
    this.src = img
  }

  get channels (): Channels {
    if (this.#channels) return this.#channels
    this.#channels = new Channels(this.getData())
    return this.#channels
  }

  get canvas (): RasterCanvas {
    if (this.#canvas) return this.#canvas
    return (this.#canvas = new RasterCanvas(this.distRect))
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

  protected get transform (): Matrix2D {
    return this.#transform
  }

  protected set transform (value: Matrix2D) {
    this.#transform = value
    this.update()
  }
}
export type Images = Raster[]
