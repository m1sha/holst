import { Scene } from '../scene'

export interface IRenderer {
  render: (scene: Scene) => void
  clear: () => void
  onFrameChanged: (() => void) | null
}
