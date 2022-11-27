import { Path2DBase } from '../path2d/path2d-base'
import { IRectReadonly } from '../geometry/rect'

export abstract class Figure {
  #modified: boolean = false
  abstract get bounds (): IRectReadonly
  abstract create (path: Path2DBase): void

  get modified (): boolean {
    return this.#modified
  }

  onModified: (() => void) | null = null

  protected setModified () {
    this.#modified = true
    if (this.onModified) this.onModified()
  }

  protected setUnmodified () {
    this.#modified = false
  }
}
