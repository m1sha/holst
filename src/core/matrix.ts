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

  static rotateMatrix (angle: number): Matrix2D {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    return matrix(cos, -sin, sin, cos, 0, 0)
  }

  /***
   * a  c  e m1.a * m2.a + m1.c * m2.b + m1.0 * m.e, m1.a * m2.c + m1.c * m2.d + m1.0 * m2.e, m1.a * m2.e + m1.c * m2.f + m1.e * 1
   * b  d  f m1.b * m2.a + m1.d * m2.b + m1.f * m2.0, m1.b * m2.c + m1.d * m2.d + m.f * m2.0, m1.b * m2.e + m1.d * m2.f + m1.f * 1
   * 0  0  1
   */
  static mul (m1: Matrix2D, m2: Matrix2D | number): Matrix2D {
    if (typeof (m2) === 'number') return this.walk(m1, m2, (value1, value2) => value1 * value2)
    return matrix(
      m1.a * m2.a + m1.c * m2.b,
      m1.b * m2.a + m1.d * m2.b,
      m1.a * m2.c + m1.c * m2.d,
      m1.b * m2.c + m1.d * m2.d,
      m1.a * m2.e + m1.c * m2.f + m1.e,
      m1.b * m2.e + m1.d * m2.f + m1.f
    )
  }

  static sum (m1: Matrix2D, m2: Matrix2D | number): Matrix2D {
    return this.walk(m1, m2, (value1, value2) => value1 + value2)
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

  private static walk (m1: Matrix2D, m2: Matrix2D | number, delegate: (value1: number, value2: number) => number): Matrix2D {
    const result: Matrix2D = {}
    const keys = Object.keys(m1)
    for (const key of keys) {
      const value = typeof (m2) === 'number' ? m2 : m2[key]
      result[key] = delegate(m1[key], value)
    }
    return result
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
