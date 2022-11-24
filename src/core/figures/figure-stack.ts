import { Path2DBase } from '../path2d/path2d-base'
import { Figure } from './figure'

export class FigureStack {
  #figures: Figure[] = []
  #path: Path2DBase = FigureStack.path2dCreateFactory()

  add (figure: Figure) {
    figure.create(this.#path)
    this.#figures.push(figure)
  }

  update () {
    this.#path = FigureStack.path2dCreateFactory()
    for (const figure of this.#figures) {
      figure.create(this.#path)
    }
  }

  static path2dCreateFactory: (() => Path2DBase) = () => new Path2D()
}
