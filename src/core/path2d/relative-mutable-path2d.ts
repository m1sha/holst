import { Point } from '../geometry/point'
import { Size } from '../geometry/size'
import { Path2DBase } from './path2d-base'

export class RelativeMutablePath2D {
  private path: Path2DBase
  readonly position: Point

  constructor (path: Path2DBase) {
    this.path = path
    this.position = new Point(0, 0)
  }

  moveTo (point: Point): this | RelativeMutablePath2D {
    this.position.x = point.x
    this.position.y = point.y
    return this
  }

  arc (radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | RelativeMutablePath2D {
    this.path.arc(this.position.x, this.position.y, radius, startAngle, endAngle, anticlockwise)
    return this
  }

  ellipse (radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this | RelativeMutablePath2D {
    this.path.ellipse(this.position.x, this.position.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    return this
  }

  lineTo (point: Point): this | RelativeMutablePath2D {
    this.path.moveTo(this.position.x, this.position.y)
    this.path.lineTo(this.position.x + point.x, this.position.y + point.y)
    this.position.x += point.x
    this.position.y += point.y
    return this
  }

  rect (size: Size): this | RelativeMutablePath2D {
    this.path.rect(this.position.x, this.position.y, size.width, size.height)
    return this
  }
}
