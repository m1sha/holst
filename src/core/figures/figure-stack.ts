import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'
import { Rect } from '../geometry/rect'

export class FigureStack {
  #figures: Figure[] = []
  #path: Path2DBase = FigureStack.path2dCreateFactory()
  #bounds: Rect = new Rect(0, 0, 0, 0)

  add (figure: Figure) {
    this.#figures.push(figure)
  }

  update () {
    this.#path = FigureStack.path2dCreateFactory()
    for (const figure of this.#figures) {
      figure.create(this.#path)
    }
  }

  get bounds (): Rect {
    return this.#bounds
  }

  get figures (): Readonly<Figure[]> {
    return this.#figures
  }

  get path2d (): Readonly<Path2DBase> {
    if (this.#figures.some(p => p.modified)) this.update()
    return this.#path
  }

  static path2dCreateFactory: (() => Path2DBase) = () => new Path2D()
}
