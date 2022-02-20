import { Point } from './point'

export class Matrix2D {
  // m11 Horizontal scaling. A value of 1 results in no scaling
  a: number
  // m12 Vertical skewing.
  b: number
  // m21 Horizontal skewing.
  c: number
  // m22 Vertical scaling. A value of 1 results in no scaling
  d: number
  // dx Horizontal translation (moving).
  e: number
  // dy Vertical translation (moving).
  f: number

  m11?: number
  m12?: number
  m21?: number
  m22?: number
  m41?: number
  m42?: number

  constructor (m?: { a?: number; b?: number; c?: number; d?: number; e?: number; f?: number }) {
    this.a = this.m11 = 1
    this.b = this.m12 = 0
    this.c = this.m21 = 0
    this.d = this.m22 = 1
    this.e = this.m41 = 0
    this.f = this.m42 = 0
    if (m) this.change(m)
  }

  change (m: { a?: number; b?: number; c?: number; d?: number; e?: number; f?: number }): Matrix2D {
    if (!m) return this
    if (typeof (m.a) === 'number') this.a = this.m11 = m.a
    if (typeof (m.b) === 'number') this.b = this.m12 = m.b
    if (typeof (m.c) === 'number') this.c = this.m21 = m.c
    if (typeof (m.d) === 'number') this.d = this.m22 = m.d
    if (typeof (m.e) === 'number') this.e = this.m41 = m.e
    if (typeof (m.f) === 'number') this.f = this.m42 = m.f
    return this
  }

  scale (point: Point): Matrix2D {
    return this.change({ a: point.x, d: point.y })
  }

  rotate (angle: number): Matrix2D {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    return this.change({ a: cos, b: -sin, c: sin, d: cos })
  }

  /***
   * a  c  e m1.a * m2.a + m1.c * m2.b + m1.0 * m.e, m1.a * m2.c + m1.c * m2.d + m1.0 * m2.e, m1.a * m2.e + m1.c * m2.f + m1.e * 1
   * b  d  f m1.b * m2.a + m1.d * m2.b + m1.f * m2.0, m1.b * m2.c + m1.d * m2.d + m.f * m2.0, m1.b * m2.e + m1.d * m2.f + m1.f * 1
   * 0  0  1
   */
  mul (m: Matrix2D /* | number */): Matrix2D {
    // if (typeof (m2) === 'number') return this.walk(m1, m2, (value1, value2) => value1 * value2)
    const { a, b, c, d, e, f } = this
    const newMatrix = matrix(
      a * m.a + c * m.b,
      b * m.a + d * m.b,
      a * m.c + c * m.d,
      b * m.c + d * m.d,
      a * m.e + c * m.f + e,
      b * m.e + d * m.f + f
    )
    this.change(newMatrix)
    return this
  }

  /***
  * x' = a x + c y + e
  * y' = b x + d y + f
  *
  * a  c  e
  * b  d  f
  * 0  0  1
 */
  applyMatrix (p: Point): Point {
    const { a, b, c, d, e, f } = this
    const { x, y } = p
    return new Point(a * x + c * y + e, b * x + d * y + f)
  }

  copy () {
    return new Matrix2D().change({ a: this.a, b: this.b, c: this.c, d: this.d, e: this.e, f: this.f })
  }

  static get identity (): Matrix2D {
    return matrix(1, 0, 0, 1, 0, 0)
  }
}

export function matrix (a: number, b: number, c: number, d: number, e: number, f: number): Matrix2D {
  return new Matrix2D().change({ a, b, c, d, e, f })
}
