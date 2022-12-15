import { Scene } from '../../../src'

export function defineStyles (scene: Scene) {
  scene.styleManager.defineShapeStyle('select-frame', { stroke: '#838383' })
  scene.styleManager.defineShapeStyle('bounds-frame', { stroke: '#333', lineDash: [5, 4] })
}
