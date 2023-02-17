import { IRadialSegment } from 'core/geometry/radial-segment'
import { RadialShape } from './radial-shape'
import { Rect } from '../../geometry/rect'

export class Circle extends RadialShape {
  #radius: number

  constructor (x: number, y: number, radius: number) {
    super(x, y)
    this.#radius = radius
  }

  get radius (): number { return this.#radius }

  set radius (value: number) {
    this.#radius = value
    this.propertyChanged()
  }

  get bounds (): Rect {
    throw new Error('Method not implemented.')
  }

  protected makeSegments (segments: IRadialSegment[]): void {
    for (let i = 0; i < this.segmentCount; i++) {
      // this.#segments.push()
    }
  }
}
