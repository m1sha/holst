import { IRadialSegment } from 'core/geometry/radial-segment'
import { RadialShape } from './radial-shape'
import { Rect } from '../../geometry/rect'

export class Ellipse extends RadialShape {
  #radiusX: number
  #radiusY: number

  constructor (x: number, y: number, radiusX: number, radiusY: number) {
    super(x, y)
    this.#radiusX = radiusX
    this.#radiusY = radiusY
  }

  get radiusX (): number { return this.#radiusX }

  set radiusX (value: number) {
    this.#radiusX = value
    this.propertyChanged()
  }

  get radiusY (): number { return this.#radiusY }

  set radiusY (value: number) {
    this.#radiusY = value
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
