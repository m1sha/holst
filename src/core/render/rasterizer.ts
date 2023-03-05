import { Matrix2D } from '../matrix'
import Shape from '../shape'
import { drawShape } from './drafters/draw-shape'

export class Rasterizer {
  static rasterizeShape (shape: Shape) {
    const ctx = document.createElement('canvas').getContext('2d')!
    drawShape(ctx, shape, null, Matrix2D.identity)
    return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
}
