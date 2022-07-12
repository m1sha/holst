/* global CanvasImageSource */
import { Size } from '../size'
import CanvasRenderingContext2DFactory from '../render/canvas-rendering-context-2d-factory'

type RasterDataTransferWriteCallback = { data: ImageData, write: () => CanvasImageSource }

export class RasterDataTransfer {
  static read (img: CanvasImageSource, size: Size) {
    const { ctx } = CanvasRenderingContext2DFactory.create(size)
    ctx.drawImage(img, 0, 0, size.width, size.height, 0, 0, size.width, size.height)
    const imageData = ctx.getImageData(0, 0, size.width, size.height)
    return imageData
  }

  static createWriter (size: Size): RasterDataTransferWriteCallback {
    const { ctx, canvas } = CanvasRenderingContext2DFactory.create(size)
    const data = ctx.createImageData(size.width, size.height)
    return {
      data,
      write: () => {
        ctx.putImageData(data, 0, 0, 0, 0, size.width, size.height)
        return canvas
      }
    }
  }
}
