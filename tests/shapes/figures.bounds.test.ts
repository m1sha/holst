import { Rect } from '../../src/core/geometry/rect'
import { Arc } from '../../src/core/figures/arc'
import { Rectangle } from '../../src/core/figures/rectangle'
import { Ellipse } from '../../src/core/figures/ellipse'
import { Line } from '../../src/core/figures/line'

test('Rectangle bounds', () => {
  const figure = new Rectangle({ x: 10, y: 10, width: 100, height: 200 })
  const bounds = figure.bounds
  expect(bounds).toStrictEqual(new Rect({ x: 10, y: 10, width: 100, height: 200 }))
})

test('Arc bounds', () => {
  const figure = new Arc(100, 100, 50, 0, Math.PI * 2)
  expect(figure.bounds).toStrictEqual(new Rect({ x: 50, y: 50, width: 100, height: 100 }))
})

test('Ellipse bounds', () => {
  const figure = new Ellipse(100, 100, 50, 50, 0, 0, Math.PI * 2)
  expect(figure.bounds).toStrictEqual(new Rect({ x: 50, y: 50, width: 100, height: 100 }))
})

test('Line bounds', () => {
  const figure = new Line()
  figure.moveTo({ x: 50, y: 50 }).lineTo({ x: 150, y: 150 })
  expect(figure.bounds).toStrictEqual(new Rect({ x: 50, y: 50, width: 100, height: 100 }))
})
