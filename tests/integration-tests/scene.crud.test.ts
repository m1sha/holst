import '../mock/mockDOMMatrix'
import { Scene } from '../../src/core/scene'

test('scene crud', () => {
  const scene = new Scene()
  expect(scene.layers.length).toBe(0)

  scene.createLayer()
  scene.createLayer()
  scene.createLayer()
  expect(scene.layers.length).toBe(3)

  scene.removeLayer(2)
  scene.removeLayer(1)
  scene.removeLayer(0)
  expect(scene.layers.length).toBe(0)

  scene.createLayer('my-layer-1')
  scene.createLayer('my-layer-2')
  expect(scene.layers.length).toBe(2)

  scene.removeLayer('my-layer-1')
  expect(scene.layers.length).toBe(1)
  expect(scene.layers[0].name).toBe('my-layer-2')

  scene.removeLayer('my-layer-2')
  expect(scene.layers.length).toBe(0)
})
