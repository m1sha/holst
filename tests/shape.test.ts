import { Layer } from '../src/core/layers'
import { point } from '../src/core/utils'
import TestContext2D from './test-context2d'
import { LineToCommand, MoveToCommand, TestCommandDispatcher } from './test-draw-command'

test('shape', () => {
  const commands = new TestCommandDispatcher()
  const layer = new Layer(new TestContext2D(commands), 'bottom-left')
  layer.location.x = 50
  const shape = layer.createShape()
  shape.lineV(point(1, 1), 50)
  const moveTo = commands.pop<MoveToCommand>()
  const lineTo = commands.pop<LineToCommand>()
  expect(moveTo).toEqual({ x: 51, y: 1 })
  expect(lineTo).toEqual({ x: 51, y: 51 })
})
