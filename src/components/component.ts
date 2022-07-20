import { Scene } from '../core/scene'

export interface IComponent {
  create (scene: Scene): void
}
