import { RasterDataTransfer } from './raster/raster-data-transfer'
import { IRect, Rect } from './geometry/rect'
import { Channels } from './raster/channels'
import { Drawable, DrawableType } from './drawable'
import { UseFilters } from './raster/filters/use-filters'
import { IPoint, Point } from './geometry/point'
import { Matrix2D } from './matrix'
import { RasterCanvas } from './render/raster-canvas'
import { Color } from './colors/color'
import CanvasRenderingContext2DFactory from './render/canvas-rendering-context-2d-factory'
import { PixelArray } from './raster/filters/helpers/pixel-array'

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

  #imageData: ImageData | null = null

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

  static createEmpty (rect: IRect, color: Color = Color.white): Raster {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(rect)
    const offset = CanvasRenderingContext2DFactory.createOffscreen(rect)
    offset.ctx.fillStyle = color.toString()
    offset.ctx.rect(0, 0, canvas.width, canvas.height)
    offset.ctx.fill()
    ctx.drawImage(offset.canvas.transferToImageBitmap(), 0, 0)
    return new Raster(canvas, rect, rect)
  }

  getData (): ImageData {
    // if (this.#imageData) return this.#imageData
    return (this.#imageData = RasterDataTransfer.read(this.src, this.distRect))
  }

  setData (imagedata: ImageData) {
    if (this.src instanceof HTMLCanvasElement) {
      this.src.getContext('2d')?.putImageData(imagedata, 0, 0)
      return
    }
    const img = RasterDataTransfer.write(imagedata)
    this.src = img
  }

  merge (distCanvas: ImageData | HTMLCanvasElement | OffscreenCanvas) {
    if (distCanvas instanceof OffscreenCanvas) {
      if (this.src instanceof HTMLCanvasElement) {
        this.src.getContext('bitmaprenderer')!.transferFromImageBitmap(distCanvas.transferToImageBitmap())
        return
      }
      const { canvas } = CanvasRenderingContext2DFactory.create(this.distRect)
      canvas.getContext('bitmaprenderer')!.transferFromImageBitmap(distCanvas.transferToImageBitmap())
      this.src = canvas
      return
    }
    // if (this.src instanceof HTMLCanvasElement) {
    //   const c = this.src.getContext('2d')!
    //   c.drawImage(distCanvas, 0, 0)
    //   return
    // }

    const offset = CanvasRenderingContext2DFactory.create(this.distRect)
    offset.ctx.putImageData(distCanvas as ImageData, 0, 0)

    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(this.distRect)
    ctx.drawImage(this.src, 0, 0)
    ctx.globalCompositeOperation = 'hard-light'
    ctx.drawImage(offset.canvas, 0, 0)
    this.src = canvas
  }

  getPixel (point: IPoint): Color {
    const data = this.getData()
    const arr = new PixelArray(data)
    const index = arr.getIndex(point)
    return new Color(arr.getU32(index))
  }

  get channels (): Channels {
    if (this.#channels) return this.#channels
    this.#channels = new Channels(this.getData())
    return this.#channels
  }

  get canvas (): RasterCanvas {
    if (this.#canvas) return this.#canvas
    return (this.#canvas = new RasterCanvas(this))
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
