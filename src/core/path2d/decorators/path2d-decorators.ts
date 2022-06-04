import { Circle, Ellipse } from '../types/path2d-element'

export class CircleDecorator {
  private circle: Circle

  constructor (circle: Circle) {
    this.circle = circle
  }

  get x () { return this.circle.x }
  set x (value: number) { this.circle.x = value }

  get y () { return this.circle.y }
  set y (value: number) { this.circle.y = value }

  get r () { return this.circle.radius }
  set r (value: number) { this.circle.radius = value }
}

export class EllipseDecorator {
  private ellipse: Ellipse

  constructor (ellipse: Ellipse) {
    this.ellipse = ellipse
  }

  get x () { return this.ellipse.x }
  set x (value: number) { this.ellipse.x = value }

  get y () { return this.ellipse.y }
  set y (value: number) { this.ellipse.y = value }

  get rX () { return this.ellipse.radiusX }
  set rX (value: number) { this.ellipse.radiusX = value }

  get ry () { return this.ellipse.radiusY }
  set ry (value: number) { this.ellipse.radiusY = value }
}
