import { Arc, ArcTo, Circle, Ellipse, LineTo, MoveTo, Rect, RoundRect } from '../types/path2d-element'

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

export class ArcDecorator {
  private arc: Arc

  constructor (arc: Arc) {
    this.arc = arc
  }

  get x () { return this.arc.x }
  set x (value: number) { this.arc.x = value }

  get y () { return this.arc.y }
  set y (value: number) { this.arc.y = value }

  get r () { return this.arc.radius }
  set r (value: number) { this.arc.radius = value }
}

export class ArcToDecorator {
  private arcTo: ArcTo

  constructor (arc: ArcTo) {
    this.arcTo = arc
  }

  get x1 () { return this.arcTo.x1 }
  set x1 (value: number) { this.arcTo.x1 = value }

  get y1 () { return this.arcTo.y1 }
  set y1 (value: number) { this.arcTo.y1 = value }

  get x2 () { return this.arcTo.x2 }
  set x2 (value: number) { this.arcTo.x2 = value }

  get y2 () { return this.arcTo.y2 }
  set y2 (value: number) { this.arcTo.y2 = value }

  get r () { return this.arcTo.radius }
  set r (value: number) { this.arcTo.radius = value }
}

export class MoveToDecorator {
  private moveTo: MoveTo

  constructor (moveTo: MoveTo) {
    this.moveTo = moveTo
  }

  get x () { return this.moveTo.x }
  set x (value: number) { this.moveTo.x = value }

  get y () { return this.moveTo.y }
  set y (value: number) { this.moveTo.y = value }
}

export class LineToDecorator {
  private lineTo: LineTo

  constructor (lineTo: LineTo) {
    this.lineTo = lineTo
  }

  get x () { return this.lineTo.x }
  set x (value: number) { this.lineTo.x = value }

  get y () { return this.lineTo.y }
  set y (value: number) { this.lineTo.y = value }
}

export class RectDecorator {
  private rect: Rect

  constructor (rect: Rect) {
    this.rect = rect
  }

  get x () { return this.rect.x }
  set x (value: number) { this.rect.x = value }

  get y () { return this.rect.y }
  set y (value: number) { this.rect.y = value }

  get w () { return this.rect.w }
  set w (value: number) { this.rect.w = value }

  get h () { return this.rect.h }
  set h (value: number) { this.rect.h = value }
}

export class RoundRectDecorator {
  private roundRect: RoundRect

  constructor (rect: RoundRect) {
    this.roundRect = rect
  }

  get x () { return this.roundRect.x }
  set x (value: number) { this.roundRect.x = value }

  get y () { return this.roundRect.y }
  set y (value: number) { this.roundRect.y = value }

  get w () { return this.roundRect.w }
  set w (value: number) { this.roundRect.w = value }

  get h () { return this.roundRect.h }
  set h (value: number) { this.roundRect.h = value }

  get tl () { return this.roundRect.tl }
  set tl (value: number) { this.roundRect.tl = value }

  get tr () { return this.roundRect.tr }
  set tr (value: number) { this.roundRect.tr = value }

  get bl () { return this.roundRect.bl }
  set bl (value: number) { this.roundRect.bl = value }

  get br () { return this.roundRect.br }
  set br (value: number) { this.roundRect.br = value }
}
