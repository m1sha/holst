import { Scene } from '../scene'

export interface IComponent {
  create (scene: Scene): void
}
