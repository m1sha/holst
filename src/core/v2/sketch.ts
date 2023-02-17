import { Point } from 'core/geometry/point'
import { Rect } from 'core/geometry/rect'
import { Drawable, DrawableType } from '../drawable'
import { Shape } from './shapes/shape'

export class Sketch extends Drawable {
  #shapes: Shape[]

  constructor (order: number) {
    super(order)
    this.#shapes = []
  }

  add (shape: Shape): Sketch {
    this.#shapes.push(shape)
    return this
  }

  get <T extends Shape> (index: number): T {
    return this.#shapes[index] as T
  }

  count (): number {
    return this.#shapes.length
  }

  getType (): DrawableType {
    return 'shape'
  }

  get bounds (): Rect {
    throw new Error('Method not implemented.')
  }

  inPath (p: Point): boolean {
    throw new Error('Method not implemented.')
  }

  rasterize (): ImageData {
    return new ImageData(0, 0)
  }
}
