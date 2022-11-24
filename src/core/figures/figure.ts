import { Path2DBase } from '../path2d/path2d-base'
import { IRectReadonly } from '../geometry/rect'

export abstract class Figure {
  abstract get bounds (): IRectReadonly
  abstract create (path: Path2DBase): void
}
