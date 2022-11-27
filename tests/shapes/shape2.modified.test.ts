import '../mock/mockDOMMatrix'
import { Shape2 } from '../../src/core/shape2'
import { FigureStack } from '../../src/core/figures/figure-stack'
import { MockPath2D } from '../mock/mock-path2d'

test('shape2 modified', () => {
  FigureStack.path2dCreateFactory = () => new MockPath2D()
  const shape = Shape2.create()

  shape.rect(10, 10, 100, 100)
  expect(shape.modified).toBeTruthy()

  shape.toPath2D()
  expect(shape.modified).toBeFalsy()

  const line = shape.line()
    .moveTo({ x: 0, y: 0 })
    .lineTo({ x: 50, y: 50 })
  expect(shape.modified).toBeTruthy()

  shape.toPath2D()
  expect(shape.modified).toBeFalsy()

  line.segments[1].x = 100
  expect(shape.modified).toBeTruthy()

  shape.toPath2D()
  expect(shape.modified).toBeFalsy()
})
