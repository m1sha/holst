import { calcBounds } from '../../utils/utils'
import { IPoint, Point } from '../geometry/point'
import { IRectReadonly } from '../geometry/rect'
import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

type LineSegmentType = 'line' | 'quadratic-bezier' | 'cubic-bezier' | 'gap' | 'move'
export interface LineSegment {
  point: IPoint
  type: LineSegmentType
  controlPoints?: IPoint[]
  x: number
  y: number
  cp1: IPoint | null
  cp2: IPoint | null
}

class LineSegmentDecorator implements LineSegment {
  private update: () => void
  readonly #point: IPoint
  #type: LineSegmentType
  #controlPoints: IPoint[] | undefined

  constructor (point: IPoint, type: LineSegmentType, controlPoints: IPoint[] | undefined, update: () => void) {
    this.#point = point
    this.#type = type
    this.#controlPoints = controlPoints
    this.update = update
  }

  get point (): Readonly<IPoint> { return this.#point }

  set point (point: IPoint) {
    this.#point.x = point.x
    this.#point.y = point.y
    this.update()
  }

  get type () { return this.#type }

  set type (value: LineSegmentType) {
    this.#type = value
    if (value === 'move' || value === 'gap') this.#controlPoints = []
    this.update()
  }

  get controlPoints () {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    return this.#controlPoints
  }

  set controlPoints (points: IPoint[] | undefined) {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    this.#controlPoints = points
  }

  get x () { return this.#point.x }

  set x (value: number) {
    this.#point.x = value
    this.update()
  }

  get y () { return this.#point.y }

  set y (value: number) {
    this.#point.y = value
    this.update()
  }

  get cp1 (): Readonly<IPoint> | null {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    if (!this.#controlPoints?.length) return null
    return this.#controlPoints[0]
  }

  set cp1 (value: Readonly<IPoint> | null) {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    if (!value) {
      this.#controlPoints = undefined
      this.update()
      return
    }
    if (!this.#controlPoints) this.#controlPoints = []
    if (this.#controlPoints.length === 0) this.#controlPoints.push(Point.zero)
    this.#controlPoints[0].x = value.x
    this.#controlPoints[0].y = value.y
    this.update()
  }

  get cp2 (): Readonly<IPoint> | null {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    if (!this.#controlPoints?.length || this.#controlPoints?.length !== 2) return null
    return this.#controlPoints[1]
  }

  set cp2 (value: Readonly<IPoint> | null) {
    if (this.#type === 'move' || this.#type === 'gap') throw new Error(`The line segment type "${this.#type}" unsupported control points`)
    if (!value) {
      this.#controlPoints = undefined
      this.update()
      return
    }
    if (!this.#controlPoints) this.#controlPoints = []
    if (this.#controlPoints.length === 0) this.#controlPoints.push(Point.zero)
    if (this.#controlPoints.length === 1) this.#controlPoints.push(Point.zero)
    this.#controlPoints[1].x = value.x
    this.#controlPoints[1].y = value.y
    this.update()
  }
}

export type LineSettings = {
  smooth?: boolean
}

export class Line<T> extends Figure {
  private isClosed: boolean = false
  #segments: LineSegmentDecorator[] = []
  #sender: T

  constructor (sender?: T) {
    super()
    this.#sender = sender || {} as T
  }

  moveTo (point: IPoint): this {
    this.#segments.push(new LineSegmentDecorator(point, 'move', undefined, () => this.setModified()))
    this.setModified()
    return this
  }

  lineTo (point: IPoint, controlPoints?: [IPoint] | [IPoint, IPoint]): this {
    this.setModified()
    if (!controlPoints) this.#segments.push(new LineSegmentDecorator(point, 'line', undefined, () => this.setModified()))
    if (controlPoints && controlPoints.length === 1) {
      this.#segments.push(new LineSegmentDecorator(point, 'quadratic-bezier', controlPoints, () => this.setModified()))
    }
    if (controlPoints && controlPoints.length === 2) {
      this.#segments.push(new LineSegmentDecorator(point, 'cubic-bezier', controlPoints, () => this.setModified()))
    }
    return this
  }

  gapTo (point: IPoint): this {
    this.setModified()
    this.#segments.push(new LineSegmentDecorator(point, 'gap', undefined, () => this.setModified()))
    return this
  }

  polyline (points: IPoint[]): this {
    this.setModified()
    for (const point of points) {
      this.#segments.push(new LineSegmentDecorator(point, 'line', undefined, () => this.setModified()))
    }
    return this
  }

  close () {
    this.isClosed = true
  }

  end (): T {
    return this.#sender
  }

  get segments (): LineSegment[] {
    return this.#segments
  }

  get bounds (): IRectReadonly {
    return calcBounds(this.#segments.map(p => p.point))
  }

  create (path: Path2DBase): void {
    if (this.#segments.length === 0) return
    this.setUnmodified()

    path.moveTo(this.#segments[0].point.x, this.#segments[0].point.y)
    for (let i = 1; i < this.#segments.length; i++) {
      if (this.#segments[i - 1].type === 'gap') path.moveTo(this.#segments[i - 1].point.x, this.#segments[i - 1].point.y)
      if (this.#segments[i].type === 'move') path.moveTo(this.#segments[i].point.x, this.#segments[i].point.y)
      if (this.#segments[i].type === 'line') path.lineTo(this.#segments[i].point.x, this.#segments[i].point.y)
      if (this.#segments[i].type === 'quadratic-bezier') {
        const p = this.#segments[i].point
        if (!this.#segments[i].controlPoints) throw new Error('')
        const [sp] = this.#segments[i].controlPoints!
        path.quadraticCurveTo(sp.x, sp.y, p.x, p.y)
      }
      if (this.#segments[i].type === 'cubic-bezier') {
        const p = this.#segments[i].point
        if (!this.#segments[i].controlPoints) throw new Error('')
        const [sp1, sp2] = this.#segments[i].controlPoints!
        path.bezierCurveTo(sp1.x, sp1.y, sp2.x, sp2.y, p.x, p.y)
      }
    }

    if (this.isClosed) path.closePath()
  }
}
