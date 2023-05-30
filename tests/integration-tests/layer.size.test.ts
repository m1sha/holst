import '../mock/mockDOMMatrix'
import { fooLayer } from './foo/foo-layer'
import { fooShape } from './foo/foo-shape'

test('layer bounds', () => {
  const layer = fooLayer()
  const shape0 = fooShape().rect(10, 10, 100, 100)
  const shape1 = fooShape().rect(50, 50, 200, 200)
  layer.add(shape0)
  layer.add(shape1)

  expect(layer.size).toStrictEqual({ width: 250, height: 250 })
})
