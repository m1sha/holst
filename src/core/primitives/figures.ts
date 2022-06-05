import { Path2DElement } from '../path2d/types/path2d-element'
import { Path2DRecorder } from '../path2d/path2d-recorder'
import { Mutable } from '../mutable'
import { createPath2ElementDecorator } from '../path2d/decorators/path2d-decorator'
export class Figures {
  private recorder: Path2DRecorder
  private mutable: Mutable

  constructor (recorder: Path2DRecorder, mutable: Mutable) {
    this.recorder = recorder
    this.mutable = mutable
  }

  get moveTos () {
    return this.createDecorator('MoveTo')
  }

  get circles () {
    return this.createDecorator('Circle')
  }

  get ellipses () {
    return this.createDecorator('Ellipse')
  }

  get arcs () {
    return this.createDecorator('Arc')
  }

  get arcTos () {
    return this.createDecorator('ArcTo')
  }

  get lineTos () {
    return this.createDecorator('LineTo')
  }

  get rects () {
    return this.createDecorator('Rect')
  }

  get roundRects () {
    return this.createDecorator('RoundRect')
  }

  get bezierCurveTos () {
    return this.createDecorator('BezierCurveTo')
  }

  get quadraticCurveTos () {
    return this.createDecorator('QuadraticCurveTo')
  }

  get arrows () {
    return this.createDecorator('Arrow')
  }

  private createDecorator <T extends Path2DElement['type']> (type: T) {
    return this.recorder.find(type).map(p => createPath2ElementDecorator<T>(p, this.mutable))
  }
}
