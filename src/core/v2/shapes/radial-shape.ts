import { SegmentType } from '../../geometry/segment-type'
import { IRadialSegment } from '../../geometry/radial-segment'
import { IPoint } from '../../geometry/point'
import { Shape } from './shape'

export abstract class RadialShape extends Shape {
  #x: number
  #y: number
  #segmentCount: number
  #segmentType: SegmentType
  #segments: IRadialSegment[]

  constructor (x: number, y: number) {
    super()
    this.#x = x
    this.#y = y
    this.#segmentCount = 0
    this.#segmentType = 'solid-line'
    this.#segments = []
  }

  get x (): number { return this.#x }

  get y (): number { return this.#y }

  get center (): Readonly<IPoint> { return { x: this.#x, y: this.#y } }

  set center (value: IPoint) {
    if (!value) throw Error("value isn't undefined")
    this.#x = value.x
    this.#y = value.y
    this.propertyChanged()
  }

  get segmentCount (): number { return this.#segmentCount }

  set segmentCount (value: number) {
    if (isFinite(value) || isNaN(value) || value < 0) throw Error("value isn't supported")
    this.#segmentCount = value
    this.#segments = []
    if (value > 0) this.makeSegments(this.#segments)
    this.propertyChanged()
  }

  get segmentType (): SegmentType { return this.#segmentType }

  set segmentType (value: SegmentType) {
    this.#segmentType = value
    if (this.#segmentCount > 0) this.makeSegments(this.#segments)
    this.propertyChanged()
  }

  get segments (): Readonly<Readonly<IRadialSegment>[]> {
    return this.#segments
  }

  changeSegment (index: number, callback: (point: IRadialSegment) => void) {
    callback(this.#segments[index])
    this.propertyChanged()
  }

  foreachSegment (callback: (point: IRadialSegment, index: number) => void) {
    for (let i = 0; i < this.#segmentCount; i++) {
      callback(this.#segments[i], i)
    }
    this.propertyChanged()
  }

  protected abstract makeSegments (segments: IRadialSegment[]): void
}
