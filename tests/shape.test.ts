import { Layer } from '../src/core/layers'
import { point } from '../src/core/utils'
import TestContext2D from './test-context2d'
import { TestCommandDispatcher } from './test-draw-command'

test('shape', () => {
  const dispatcher = new TestCommandDispatcher()
  const layer = new Layer(new TestContext2D(dispatcher), 'top-left')
  layer.location.x = 50
  const shape = layer.createShape()
  shape.lineV(point(1, 1), 50)
  expect(true).toBe(true)
})
