import { RoundRect } from '../../src/core/path2d/path2d-element'
import { createPath2ElementDecorator } from '../../src/core/path2d/path2d-decorator'

test('Path2ElementDecorator', () => {
  let modified = false
  const rect: RoundRect = createTestRect()

  const decorator = createPath2ElementDecorator<'RoundRect'>(rect, { setModified: () => (modified = true) })

  expect(rect).toStrictEqual(decorator)
  expect(modified).toBeFalsy()

  decorator.x = 20
  decorator.y = 30

  expect(rect).toStrictEqual(decorator)
  expect(modified).toBeTruthy()
})

function createTestRect (): RoundRect {
  return { type: 'RoundRect', x: 10, y: 10, w: 10, h: 10, tl: 2, tr: 2, bl: 2, br: 2 }
}
