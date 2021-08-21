import { Layer } from '../src/core/layers'
import { padding, point } from '../src/core/utils'
import TestContext2D from './test-context2d'

test('Layer ratio should be (1, 1)', () => {
  const layer = new Layer(new TestContext2D(), 'top-left')
  expect(layer.ratio).toStrictEqual(point(1, 1))

  layer.setPadding(padding(10, 10, -20, -20))
  expect(layer.ratio).toStrictEqual(point(1, 1))

  const layer2 = new Layer(new TestContext2D(), 'bottom-left')
  expect(layer2.ratio).toStrictEqual(point(1, 1))

  layer2.setPadding(padding(10, 10, -20, -20))
  expect(layer2.ratio).toStrictEqual(point(1, 1))
})

test('Layer ratio should be (0.5, 0.5)', () => {
  const layer = new Layer(new TestContext2D(), 'top-left')
  layer.setPadding(padding(25, 25, 0, 0))
  expect(layer.ratio).toStrictEqual(point(0.5, 0.5))

  const layer2 = new Layer(new TestContext2D(), 'bottom-left')
  layer2.setPadding(padding(25, 25, 0, 0))
  expect(layer2.ratio).toStrictEqual(point(0.5, 0.5))
})
