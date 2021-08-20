import { Layer } from '../src/core/layers'
import { padding, point } from '../src/core/utils'
import TestContext2D from './test-context2d'

test('dd', () => {
  const layer = new Layer(new TestContext2D(), 'top-left')
  expect(layer.ratio).toStrictEqual(point(1, 1))

  layer.setPadding(padding(10, 20, 10, 20))
  expect(layer.ratio).toStrictEqual(point(1, 1))
})
