import { IPoint } from '../geometry/point'

export function mpEllipseDraw (xc: number, yc: number, rx: number, ry: number): IPoint[] {
  const result = []
  let x = 0
  let y = ry

  let d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx)
  let dx = 2 * ry * ry * x
  let dy = 2 * rx * rx * y

  while (dx < dy) {
    result.push(({ x: x + xc, y: y + yc }))
    result.push(({ x: -x + xc, y: y + yc }))
    result.push(({ x: x + xc, y: -y + yc }))
    result.push(({ x: -x + xc, y: -y + yc }))

    if (d1 < 0) {
      x++
      dx = dx + (2 * ry * ry)
      d1 = d1 + dx + (ry * ry)
    } else {
      x++
      y--
      dx = dx + (2 * ry * ry)
      dy = dy - (2 * rx * rx)
      d1 = d1 + dx - dy + (ry * ry)
    }
  }

  let d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry)

  while (y >= 0) {
    result.push(({ x: x + xc, y: y + yc }))
    result.push(({ x: -x + xc, y: y + yc }))
    result.push(({ x: x + xc, y: -y + yc }))
    result.push(({ x: -x + xc, y: -y + yc }))

    if (d2 > 0) {
      y--
      dy = dy - (2 * rx * rx)
      d2 = d2 + (rx * rx) - dy
    } else {
      y--
      x++
      dx = dx + (2 * ry * ry)
      dy = dy - (2 * rx * rx)
      d2 = d2 + dx - dy + (rx * rx)
    }
  }

  return result
}
