import '../mock/mockDOMMatrix'
import { Rect } from '../../src/core/geometry/rect'
import { mockShapeFactory } from '../mock/mock-shape-factory'

test('Shape check bounds rect', () => {
  const shape = mockShapeFactory()
  shape.rect(new Rect(0, 0, 100, 100))
  expect(shape.bounds).toEqual(new Rect(0, 0, 100, 100))
})

test('Shape check bounds circle', () => {
  const shape = mockShapeFactory()
  shape.circle({ x: 50, y: 50 }, 50)
  expect(shape.bounds).toEqual(new Rect(0, 0, 100, 100))
})

test('Shape check bounds ellipse', () => {
  const shape = mockShapeFactory()
  shape.ellipse({ x: 50, y: 50 }, 50, 50, 0, 0, Math.PI * 2)
  expect(shape.bounds).toEqual(new Rect(0, 0, 100, 100))
})

test('Shape check moveto lineto', () => {
  const shape = mockShapeFactory()
  shape.moveTo({ x: 0, y: 0 })
  shape.lineTo({ x: 100, y: 100 })
  expect(shape.bounds).toEqual(new Rect(0, 0, 100, 100))
})
