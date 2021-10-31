import { Path2dData } from '../src/core/path2d-data'
import { point } from '../src/core/utils'
import { TestCommandDispatcher } from './test-draw-command'
import TestPath2D from './test-path2d'

test('path2d-data from parser === toSvg ', () => {
  const incoming = 'M10 10m3 3h17v-3h10v3h17v17h3v10h-3v17h-17v3h-10v-3h-17v-17h-3v-10h3v-17'
  const pathData = Path2dData.parse(incoming)
  const outgoing = pathData.toSvgPath()
  expect(incoming).toBe(outgoing)
})

test('path2d-data MoveTo', () => {
  const path = new TestPath2D(new TestCommandDispatcher())
  let incoming = 'M10 10'
  let pathData = Path2dData.parse(incoming)
  pathData.toPath2D(path)
  expect(pathData.currentPosition).toStrictEqual(point(10, 10))

  incoming = 'M10 10 M60 60'
  pathData = Path2dData.parse(incoming)
  pathData.toPath2D(path)
  expect(pathData.currentPosition).toStrictEqual(point(60, 60))

  incoming = 'M10 10 m60 60'
  pathData = Path2dData.parse(incoming)
  pathData.toPath2D(path)
  expect(pathData.currentPosition).toStrictEqual(point(70, 70))

  incoming = 'M10 10 m60 60 M10 10'
  pathData = Path2dData.parse(incoming)
  pathData.toPath2D(path)
  expect(pathData.currentPosition).toStrictEqual(point(10, 10))
})
