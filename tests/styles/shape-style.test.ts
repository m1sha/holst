import { Shadow } from '../../src/core/styles/shadow'
import { ShapeStyleImpl } from '../../src/core/styles/shape-style'

test('shape-style shadow', () => {
  const style = new ShapeStyleImpl({ shadow: new Shadow() }, () => {
    expect(style.shadow!.color).toBe('#fff')
  })
  style.shadow!.color = '#fff'
})
