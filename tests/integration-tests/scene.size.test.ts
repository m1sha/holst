import '../mock/mockDOMMatrix'
import { Scene } from '../../src/core/scene'
import { fooShape } from './foo/foo-shape'

test('scene size', () => {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const shape00 = fooShape().rect(10, 10, 100, 100)
  const shape01 = fooShape().rect(50, 50, 200, 400)
  layer0.add(shape00)
  layer0.add(shape01)

  const layer1 = scene.createLayer()
  const shape10 = fooShape().rect(5, 10, 50, 100)
  const shape11 = fooShape().rect(50, 50, 250, 200)
  layer1.add(shape10)
  layer1.add(shape11)

  expect(scene.size).toStrictEqual({ width: 300, height: 450 })
})
