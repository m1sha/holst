import { Circle, Ellipse } from '../path2d/types/path2d-element'
import { CircleDecorator, EllipseDecorator } from '../path2d/decorators/path2d-decorators'
import { Path2DRecorder } from '../path2d/path2d-recorder'

export class Figures {
  private recorder: Path2DRecorder

  constructor (recorder: Path2DRecorder) {
    this.recorder = recorder
  }

  get moveTos () {
    return this.recorder.find('MoveTo')
  }

  get circles () {
    return this.recorder.find('Circle').map(p => new CircleDecorator(p as Circle))
  }

  get ellipses () {
    return this.recorder.find('Ellipse').map(p => new EllipseDecorator(p as Ellipse))
  }
}
