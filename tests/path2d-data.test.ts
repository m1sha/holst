import { Path2dData } from '../src/core/path2d-data'

test('path2d-data from parser === toSvg ', () => {
  const incoming = 'M10 10m3 3h17v-3h10v3h17v17h3v10h-3v17h-17v3h-10v-3h-17v-17h-3v-10h3v-17'
  const pathData = Path2dData.parse(incoming)
  const outgoing = pathData.toSvgPath()
  expect(incoming).toBe(outgoing)
})
