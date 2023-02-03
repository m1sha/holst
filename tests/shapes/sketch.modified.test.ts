import '../mock/mockDOMMatrix'
import { Sketch } from '../../src/core/sketch'
import { FigureStack } from '../../src/core/figures/figure-stack'
import { MockPath2D } from '../mock/mock-path2d'

test('Sketch modified', () => {
  FigureStack.path2dCreateFactory = () => new MockPath2D()
  const sketch = Sketch.create()

  sketch.rect(10, 10, 100, 100)
  expect(sketch.modified).toBeTruthy()

  sketch.toPath2D()
  expect(sketch.modified).toBeFalsy()

  const line = sketch.line()
    .moveTo({ x: 0, y: 0 })
    .lineTo({ x: 50, y: 50 })
  expect(sketch.modified).toBeTruthy()

  sketch.toPath2D()
  expect(sketch.modified).toBeFalsy()

  line.segments[1].x = 100
  expect(sketch.modified).toBeTruthy()

  sketch.toPath2D()
  expect(sketch.modified).toBeFalsy()
})
