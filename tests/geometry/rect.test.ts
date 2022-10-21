import { Rect } from '../../src/core/geometry/rect'

test('rect intersectsHorizontal & Vertical', () => {
  const rect = new Rect(200, 80, 100, 40)

  expect(rect.intersectsHorizontal(199)).toBeFalsy()
  expect(rect.intersectsHorizontal(200)).toBeTruthy()
  expect(rect.intersectsHorizontal(202)).toBeTruthy()
  expect(rect.intersectsHorizontal(300)).toBeTruthy()

  expect(rect.intersectsHorizontal(301)).toBeFalsy()
  expect(rect.intersectsVertical(79)).toBeFalsy()
  expect(rect.intersectsVertical(80)).toBeTruthy()
  expect(rect.intersectsVertical(120)).toBeTruthy()
  expect(rect.intersectsVertical(121)).toBeFalsy()
})

test('rect intersectsPoint', () => {
  const rect = new Rect(10, 10, 100, 100)

  expect(rect.intersectsPoint({ x: 12, y: 48 })).toBeTruthy()
  expect(rect.intersectsPoint({ x: 45, y: 10 })).toBeTruthy()
  expect(rect.intersectsPoint({ x: 9, y: 10 })).toBeFalsy()
  expect(rect.intersectsPoint({ x: 11, y: 121 })).toBeFalsy()
})

test('rect intersectsRect', () => {
  const rect = new Rect(10, 10, 100, 100)

  expect(rect.intersectsRect(new Rect(10, 10, 100, 100).outline(1))).toBeTruthy()
  expect(rect.intersectsRect(new Rect(50, 50, 100, 100))).toBeTruthy()
  expect(rect.intersectsRect(new Rect(0, 0, 20, 15))).toBeTruthy()
  expect(rect.intersectsRect(new Rect(200, 200, 20, 15))).toBeFalsy()
})
