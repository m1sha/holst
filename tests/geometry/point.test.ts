import { Point } from '../../src/core/geometry/point'

test('Point distance', () => {
  const d = new Point(10, 0).distance({ x: 100, y: 0 })
  expect(d).toEqual(90)

  const d2 = new Point(0, 10).distance({ x: 0, y: 100 })
  expect(d2).toEqual(90)
})
