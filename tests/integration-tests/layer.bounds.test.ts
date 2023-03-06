import { Rect } from '../../src/core/geometry/rect'
import '../mock/mockDOMMatrix'
import { fooLayer } from './foo/foo-layer'
import { fooShape } from './foo/foo-shape'

test('layer bounds', () => {
  const layer = fooLayer()
  const shape0 = fooShape().rect(10, 10, 100, 100)
  const shape1 = fooShape().rect(50, 50, 200, 200)
  const shape2 = fooShape().rect(150, 150, 100, 100)
  layer.add(shape0)
  layer.add(shape1)
  layer.add(shape2)

  expect(layer.bounds).toStrictEqual(new Rect(10, 10, 250, 250))
})
