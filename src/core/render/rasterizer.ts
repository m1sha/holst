import { Rect } from '../geometry/rect'
import { Layer } from '../layers'
import { Matrix2D, identity } from '../matrix'
import Shape from '../shape'
import { drawDrawables } from './drafters/draw-drawables'
import { drawShape } from './drafters/draw-shape'

export type RasterMimeType = 'image/png' | 'image/jpeg' | 'image/webp'

export class Rasterizer {
  static rasterizeShape (shape: Shape, dpr: number = 1) {
    const canvas = document.createElement('canvas')
    const { absHeight, absWidth } = shape.bounds
    canvas.width = absWidth + 10
    canvas.height = absHeight + 10
    const ctx = canvas.getContext('2d')!
    drawShape(ctx, shape, null, Matrix2D.identity, false, false, dpr)
    return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  static rasterizeLayer (layer: Layer, type: RasterMimeType = 'image/webp', quality: number = 1, dpr: number = 1) {
    if (quality < 0 || quality > 1) throw Error('The quality interval between 0..1')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const { drawables, mask, size } = layer
    canvas.width = size.width
    canvas.height = size.height

    drawDrawables(ctx, drawables, mask, identity(), new Rect(0, 0, size.width + 2, size.height + 2), false, false, dpr, () => {})

    return canvas.toDataURL(type, quality)
  }
}
