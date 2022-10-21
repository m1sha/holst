/* global CanvasImageSource */
import { Size } from '../geometry/size'
import CanvasRenderingContext2DFactory from '../render/canvas-rendering-context-2d-factory'

// type RasterDataTransferWriteCallback = { data: ImageData, write: () => CanvasImageSource }

export class RasterDataTransfer {
  static read (img: CanvasImageSource, size: Size) {
    const { ctx } = CanvasRenderingContext2DFactory.create(size)
    ctx.drawImage(img, 0, 0, size.width, size.height, 0, 0, size.width, size.height)
    const imageData = ctx.getImageData(0, 0, size.width, size.height)
    return imageData
  }

  static write (imageData: ImageData) {
    const { ctx, canvas } = CanvasRenderingContext2DFactory.create(imageData)
    ctx.putImageData(imageData, 0, 0)
    return canvas
  }
}
