import { Arc, ArcTo, Circle, Ellipse, LineTo, MoveTo, Rect, RoundRect } from '../path2d/types/path2d-element'
import {
  ArcDecorator,
  ArcToDecorator,
  CircleDecorator,
  EllipseDecorator,
  LineToDecorator,
  MoveToDecorator,
  RectDecorator,
  RoundRectDecorator
} from '../path2d/decorators/path2d-decorators'
import { Path2DRecorder } from '../path2d/path2d-recorder'
import { Mutable } from '../mutable'

export class Figures {
  private recorder: Path2DRecorder
  private mutable: Mutable

  constructor (recorder: Path2DRecorder, mutable: Mutable) {
    this.recorder = recorder
    this.mutable = mutable
  }

  get moveTos () {
    return this.recorder.find('MoveTo').map(p => new MoveToDecorator(p as MoveTo, this.mutable))
  }

  get circles () {
    return this.recorder.find('Circle').map(p => new CircleDecorator(p as Circle, this.mutable))
  }

  get ellipses () {
    return this.recorder.find('Ellipse').map(p => new EllipseDecorator(p as Ellipse, this.mutable))
  }

  get arcs () {
    return this.recorder.find('Arc').map(p => new ArcDecorator(p as Arc, this.mutable))
  }

  get arcTos () {
    return this.recorder.find('ArcTo').map(p => new ArcToDecorator(p as ArcTo, this.mutable))
  }

  get lineTos () {
    return this.recorder.find('LineTo').map(p => new LineToDecorator(p as LineTo, this.mutable))
  }

  get rects () {
    return this.recorder.find('Rect').map(p => new RectDecorator(p as Rect, this.mutable))
  }

  get roundRects () {
    return this.recorder.find('RoundRect').map(p => new RoundRectDecorator(p as RoundRect, this.mutable))
  }
}
