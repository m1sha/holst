import { Rect, Point, Layer, Shape } from '../../../../src'
import { Drawable, DrawableType } from '../../../../src/core/drawable'

export class Background extends Drawable {
  shape: Shape

  constructor (layer: Layer) {
    super(1)
    this.shape = layer.createShape('background').rect(0, 0, 0, 0)
  }

  getType (): DrawableType {
    return this.shape.getType()
  }

  get bounds (): Rect {
    return this.shape.bounds
  }

  inPath (p: Point): boolean {
    return this.shape.inPath(p)
  }
}
