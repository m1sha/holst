import { Scene } from '../../../src'

export function defineStyles (scene: Scene) {
  scene.styleManager.defineShapeStyle('background', { fill: '#fff' })
  scene.styleManager.defineShapeStyle('select-frame', { stroke: '#0000ff', lineDash: [3, 4], lineWidth: 1 })
  scene.styleManager.defineShapeStyle('bounds-frame', { stroke: '#333', lineDash: [5, 4] })
}
