import { Rect, Point, Layer, Shape, Size } from '../../../../src'
import { Drawable, DrawableType } from '../../../../src/core/drawable'

export class Background extends Drawable {
  shape: Shape

  constructor (layer: Layer) {
    super(0)
    this.shape = layer.createShape('background').rect(0, 0, 0, 0)
  }

  changeSize (size: Size) {
    const rect = this.shape.rects[0]
    rect.height = size.height
    rect.width = size.width
  }

  getType (): DrawableType {
    return 'shape'
  }

  get bounds (): Rect {
    return this.shape.bounds
  }

  inPath (p: Point): boolean {
    return this.shape.inPath(p)
  }
}
