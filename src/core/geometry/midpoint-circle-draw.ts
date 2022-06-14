import { IPoint } from '../point'

export function mpCircleDraw (xc: number, yc: number, r: number): IPoint[] {
  const result = []
  let x = r
  let y = 0

  result.push({ x: x + xc, y: y + yc })

  if (r > 0) {
    result.push({ x: x + xc, y: -y + yc })
    result.push({ x: x + xc, y: x + yc })
    result.push({ x: -y + xc, y: x + yc })
  }

  let p = 1 - r
  while (x > y) {
    y++

    if (p <= 0) p = p + 2 * y + 1
    else {
      x--
      p = p + 2 * y - 2 * x + 1
    }

    if (x < y) break

    result.push({ x: x + xc, y: y + yc })
    result.push({ x: -x + xc, y: y + yc })
    result.push({ x: x + xc, y: -y + yc })
    result.push({ x: -x + xc, y: -y + yc })

    if (x !== y) {
      result.push({ x: y + xc, y: x + yc })
      result.push({ x: -y + xc, y: x + yc })
      result.push({ x: y + xc, y: -x + yc })
      result.push({ x: -y + xc, y: -x + yc })
    }
  }

  return result
}
