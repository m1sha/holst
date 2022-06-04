import { Mutable } from '../../mutable'
import { Arc, ArcTo, Circle, Ellipse, LineTo, MoveTo, Rect, RoundRect } from '../types/path2d-element'

export class CircleDecorator {
  private circle: Circle
  private mutable: Mutable

  constructor (circle: Circle, mutable: Mutable) {
    this.circle = circle
    this.mutable = mutable
  }

  get x () { return this.circle.x }
  set x (value: number) { this.circle.x = value; this.mutable.setModified() }

  get y () { return this.circle.y }
  set y (value: number) { this.circle.y = value; this.mutable.setModified() }

  get r () { return this.circle.radius }
  set r (value: number) { this.circle.radius = value; this.mutable.setModified() }
}

export class EllipseDecorator {
  private ellipse: Ellipse
  private mutable: Mutable

  constructor (ellipse: Ellipse, mutable: Mutable) {
    this.ellipse = ellipse
    this.mutable = mutable
  }

  get x () { return this.ellipse.x }
  set x (value: number) { this.ellipse.x = value; this.mutable.setModified() }

  get y () { return this.ellipse.y }
  set y (value: number) { this.ellipse.y = value; this.mutable.setModified() }

  get rX () { return this.ellipse.radiusX }
  set rX (value: number) { this.ellipse.radiusX = value; this.mutable.setModified() }

  get ry () { return this.ellipse.radiusY }
  set ry (value: number) { this.ellipse.radiusY = value; this.mutable.setModified() }
}

export class ArcDecorator {
  private arc: Arc
  private mutable: Mutable

  constructor (arc: Arc, mutable: Mutable) {
    this.arc = arc
    this.mutable = mutable
  }

  get x () { return this.arc.x }
  set x (value: number) { this.arc.x = value; this.mutable.setModified() }

  get y () { return this.arc.y }
  set y (value: number) { this.arc.y = value; this.mutable.setModified() }

  get r () { return this.arc.radius }
  set r (value: number) { this.arc.radius = value; this.mutable.setModified() }
}

export class ArcToDecorator {
  private arcTo: ArcTo
  private mutable: Mutable

  constructor (arc: ArcTo, mutable: Mutable) {
    this.arcTo = arc
    this.mutable = mutable
  }

  get x1 () { return this.arcTo.x1 }
  set x1 (value: number) { this.arcTo.x1 = value; this.mutable.setModified() }

  get y1 () { return this.arcTo.y1 }
  set y1 (value: number) { this.arcTo.y1 = value; this.mutable.setModified() }

  get x2 () { return this.arcTo.x2 }
  set x2 (value: number) { this.arcTo.x2 = value; this.mutable.setModified() }

  get y2 () { return this.arcTo.y2 }
  set y2 (value: number) { this.arcTo.y2 = value; this.mutable.setModified() }

  get r () { return this.arcTo.radius }
  set r (value: number) { this.arcTo.radius = value; this.mutable.setModified() }
}

export class MoveToDecorator {
  private moveTo: MoveTo
  private mutable: Mutable

  constructor (moveTo: MoveTo, mutable: Mutable) {
    this.moveTo = moveTo
    this.mutable = mutable
  }

  get x () { return this.moveTo.x }
  set x (value: number) { this.moveTo.x = value; this.mutable.setModified() }

  get y () { return this.moveTo.y }
  set y (value: number) { this.moveTo.y = value; this.mutable.setModified() }
}

export class LineToDecorator {
  private lineTo: LineTo
  private mutable: Mutable

  constructor (lineTo: LineTo, mutable: Mutable) {
    this.lineTo = lineTo
    this.mutable = mutable
  }

  get x () { return this.lineTo.x }
  set x (value: number) { this.lineTo.x = value; this.mutable.setModified() }

  get y () { return this.lineTo.y }
  set y (value: number) { this.lineTo.y = value; this.mutable.setModified() }
}

export class RectDecorator {
  private rect: Rect
  private mutable: Mutable

  constructor (rect: Rect, mutable: Mutable) {
    this.rect = rect
    this.mutable = mutable
  }

  get x () { return this.rect.x }
  set x (value: number) { this.rect.x = value; this.mutable.setModified() }

  get y () { return this.rect.y }
  set y (value: number) { this.rect.y = value; this.mutable.setModified() }

  get w () { return this.rect.w }
  set w (value: number) { this.rect.w = value; this.mutable.setModified() }

  get h () { return this.rect.h }
  set h (value: number) { this.rect.h = value; this.mutable.setModified() }
}

export class RoundRectDecorator {
  private roundRect: RoundRect
  private mutable: Mutable

  constructor (rect: RoundRect, mutable: Mutable) {
    this.roundRect = rect
    this.mutable = mutable
  }

  get x () { return this.roundRect.x }
  set x (value: number) { this.roundRect.x = value; this.mutable.setModified() }

  get y () { return this.roundRect.y }
  set y (value: number) { this.roundRect.y = value; this.mutable.setModified() }

  get w () { return this.roundRect.w }
  set w (value: number) { this.roundRect.w = value; this.mutable.setModified() }

  get h () { return this.roundRect.h }
  set h (value: number) { this.roundRect.h = value; this.mutable.setModified() }

  get tl () { return this.roundRect.tl }
  set tl (value: number) { this.roundRect.tl = value; this.mutable.setModified() }

  get tr () { return this.roundRect.tr }
  set tr (value: number) { this.roundRect.tr = value; this.mutable.setModified() }

  get bl () { return this.roundRect.bl }
  set bl (value: number) { this.roundRect.bl = value; this.mutable.setModified() }

  get br () { return this.roundRect.br }
  set br (value: number) { this.roundRect.br = value; this.mutable.setModified() }
}
