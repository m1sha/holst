import { IPoint } from './geometry/point'
import { Rect } from './geometry/rect'
import { Matrix2D } from './matrix'

export abstract class Transformable {
  protected _transform: Matrix2D = Matrix2D.identity

  protected get transform (): Matrix2D {
    return this._transform
  }

  protected set transform (value: Matrix2D) {
    this._transform = value
  }

  abstract get bounds(): Rect

  getTransform () {
    return this.transform.copy()
  }

  injectTransform (transform: Matrix2D) {
    this.transform = transform
  }

  rotate (angle: number, point?: IPoint | undefined): this {
    this.transform.rotate(angle, point)
    return this
  }

  rotateByCenter (angle: number): this {
    this.transform.rotate(angle, this.bounds.absCenter)
    return this
  }

  scale (point: IPoint, target?: IPoint): this {
    this.transform.scale(point, target)
    return this
  }

  scaleFromCenter (point: IPoint): this {
    this.transform.scale(point, this.bounds.absCenter)
    return this
  }

  flipX (point?: IPoint): this {
    this.transform.flipX(point ?? this.bounds.absCenter)
    return this
  }

  flipY (point?: IPoint): this {
    this.transform.flipY(point ?? this.bounds.absCenter)
    return this
  }
}
