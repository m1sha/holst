/* global CanvasImageSource */
import { PixelArray } from '../raster/filters/helpers/pixel-array'
import { Color } from '../colors/color'
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

  static combine (origin: ImageData, imageData: ImageData, mask: Color) {
    const { ctx, canvas } = CanvasRenderingContext2DFactory.create(imageData)
    const src = new PixelArray(origin as any)
    const dist = new PixelArray(imageData as any)

    // const imageData2 = new ImageData(origin.width, origin.height)
    // const res = new PixelArray(imageData2 as any)

    for (let i = 0; i < origin.data.length / 4; i++) {
      if (dist.getU32(i) === mask.value) {
        // res.setU32(i, dist.getU32(i))
        continue
      }
      const [r, g, b] = dist.getRGB(i)
      src.setRGB(i, [r, g, b])
    }
    ctx.putImageData(origin, 0, 0)
    return canvas
  }
}
