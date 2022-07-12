import { RasterDataTransfer } from './raster/raster-data-transfer'
import Orderable from './orderable'
import { IRect, Rect } from './rect'

export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap
export class Raster implements Orderable {
  src: AnyImageType
  srcRect: IRect
  distRect: IRect
  order: number = 0

  constructor (src: AnyImageType, srcRect: IRect, distRect: IRect) {
    this.src = src
    this.srcRect = srcRect
    this.distRect = distRect
  }

  static createImage (url: string, callback?: (ev: Event) => void, onerror?: (ev: string | Event) => void) {
    const img = new Image()
    const srcRect = new Rect(0, 0, 0, 0)
    img.src = url
    if (callback) {
      img.onload = ev => {
        srcRect.width = img.naturalWidth
        srcRect.height = img.naturalHeight
        callback(ev)
      }
    }
    if (onerror) img.onerror = ev => onerror(ev)
    return new Raster(img, srcRect, srcRect.clone())
  }

  getData () {
    return RasterDataTransfer.read(this.src, this.distRect)
  }

  setData (imagedata: ImageData) {
    const { data, write } = RasterDataTransfer.createWriter(this.distRect)
    for (let i = 0; i < data.width * data.height * 4; i++) data.data[i] = imagedata.data[i]
    this.src = write()
  }
}
export type Images = Raster[]
