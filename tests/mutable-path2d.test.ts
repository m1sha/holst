import './mock/mockDOMMatrix'
import { MutablePath2D } from '../src/core/path2d/mutable-path2d'
import { Path2DElement } from '../src/core/path2d/types/path2d-element'

test('MutablePath2D ', () => {
  const stack: Path2DElement[] = []
  const path = new MutablePath2D(stack)
  path.rect(10, 10, 100, 100)
  expect(stack[0]).toEqual({ type: 'Rect', x: 10, y: 10, w: 100, h: 100 })
})
