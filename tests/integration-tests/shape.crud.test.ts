import '../mock/mockDOMMatrix'
import { fooShape } from './foo/foo-shape'
import { Rect } from '../../src/core/geometry/rect'

test('shape crud', () => {
  const shape = fooShape()

  shape.rect(new Rect(0, 0, 0, 0))
  expect(shape.figures.count).toBe(1)

  shape.figures.removeLast()
  expect(shape.figures.count).toBe(0)

  shape.rect(new Rect(0, 0, 0, 0))
  shape.roundRect(new Rect(0, 0, 0, 0), 50)

  expect(shape.figures.count).toBe(2)
})
