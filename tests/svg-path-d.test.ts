import { Point } from '../src/core/point'
import { SvgPathD } from '../src/core/svg/svg-path-d'
import { TransformationPath } from '../src/core/transformation-path'

test('svg-path-d from parser === toSvg ', () => {
  const incoming = 'M10 10m3 3h17v-3h10v3h17v17h3v10h-3v17h-17v3h-10v-3h-17v-17h-3v-10h3v-17'
  const svgPathD = new SvgPathD(incoming)
  const outgoing = svgPathD.toSvgPath()
  expect(incoming).toBe(outgoing)
})

test('svg-path-d MoveTo', () => {
  const path = new TransformationPath()
  let incoming = 'M10 10'
  let svgPathD = new SvgPathD(incoming)
  svgPathD.toPath2D(path)
  expect(svgPathD.currentPosition).toStrictEqual(new Point(10, 10))

  incoming = 'M10 10 M60 60'
  svgPathD = new SvgPathD(incoming)
  svgPathD.toPath2D(path)
  expect(svgPathD.currentPosition).toStrictEqual(new Point(60, 60))

  incoming = 'M10 10 m60 60'
  svgPathD = new SvgPathD(incoming)
  svgPathD.toPath2D(path)
  expect(svgPathD.currentPosition).toStrictEqual(new Point(70, 70))

  incoming = 'M10 10 m60 60 M10 10'
  svgPathD = new SvgPathD(incoming)
  svgPathD.toPath2D(path)
  expect(svgPathD.currentPosition).toStrictEqual(new Point(10, 10))
})
