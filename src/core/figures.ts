import { Path2DElement } from './path2d/path2d-element'
import { Path2DRecorder } from './path2d/path2d-recorder'
import { Mutable } from './mutable'
import { createPath2ElementDecorator } from './path2d/path2d-decorator'
export class Figures {
  private recorder: Path2DRecorder
  private mutable: Mutable

  constructor (recorder: Path2DRecorder, mutable: Mutable) {
    this.recorder = recorder
    this.mutable = mutable
  }

  get list () {
    return this.recorder.list
  }

  get count () {
    return this.recorder.count
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

  remove (index: number) {
    this.recorder.remove(index)
  }

  removeLast () {
    this.recorder.removeLast()
  }

  removeFirst () {
    this.recorder.removeFirst()
  }

  get <T extends Path2DElement['type']> (index: number) {
    return createPath2ElementDecorator<T>(this.recorder.get(index), index, this.mutable)
  }

  first <T extends Path2DElement['type']> () {
    return this.get<T>(0)
  }

  firstOrDefault <T extends Path2DElement['type']> () {
    return this.recorder.count > 0 ? this.first<T>() : null
  }

  last <T extends Path2DElement['type']> () {
    return this.get<T>(this.recorder.count - 1)
  }

  lastOrDefault <T extends Path2DElement['type']> () {
    return this.recorder.count > 0 ? this.last<T>() : null
  }

  private createDecorator <T extends Path2DElement['type']> (type: T) {
    return this.recorder.find(type).map(p => createPath2ElementDecorator<T>(p.element, p.index, this.mutable))
  }
}
