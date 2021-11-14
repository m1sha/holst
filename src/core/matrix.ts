import { Point } from './point'
import { point } from './utils'

export interface Matrix2D {
  // m11 Horizontal scaling. A value of 1 results in no scaling
  a?: number
  // m12 Vertical skewing.
  b?: number
  // m21 Horizontal skewing.
  c?: number
  // m22 Vertical scaling. A value of 1 results in no scaling
  d?: number
  // dx Horizontal translation (moving).
  e?: number
  // dy Vertical translation (moving).
  f?: number

  m11?: number
  m12?: number
  m21?: number
  m22?: number
  m41?: number
  m42?: number
}

class MATRIX {
  static get identity (): Matrix2D {
    return matrix(1, 0, 0, 1, 0, 0)
  }

  static mul (m1: Matrix2D, m2: Matrix2D | number): Matrix2D {
    return m1
  }

  /***
  * x' = a x + c y + e
  * y' = b x + d y + f
  *
  * a  c  e
  * b  d  f
  * 0  0  1
 */
  static applyMatrix (m: Matrix2D, p: Point): Point {
    return point(m.a * p.x + m.c * p.y + m.e, m.b * p.x + m.d * p.y + m.f)
  }
}

export { MATRIX }

export function matrix (a: number, b: number, c: number, d: number, e: number, f: number): Matrix2D {
  const result: Matrix2D = {}
  result.a = result.m11 = a
  result.b = result.m12 = b
  result.c = result.m21 = c
  result.d = result.m22 = d
  result.e = result.m41 = e
  result.f = result.m42 = f
  return result
}
