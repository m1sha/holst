import { Matrix2D } from '../matrix'
import Shape from '../shape'
import { drawShape } from './drafters/draw-shape'

export class Rasterizer {
  static rasterizeShape (shape: Shape) {
    const canvas = document.createElement('canvas')
    const { absHeight, absWidth } = shape.bounds
    canvas.width = absWidth + 10
    canvas.height = absHeight + 10
    const ctx = canvas.getContext('2d')!
    drawShape(ctx, shape, null, Matrix2D.identity, false)
    return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
}
