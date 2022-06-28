import { IPoint, Point } from '../../src/core/point'
import { GlobalMatrixFactory } from '../../src/core/matrix'

class MockDOMMatrix {
  constructor (init?: string | number[] | undefined) {
    this.m11 = this.a = 1
    this.m12 = this.b = 0
    this.m21 = this.c = 0
    this.m22 = this.d = 1
    this.m13 = this.e = 0
    this.m23 = this.f = 0
    this.m14 = 0
    this.m24 = 0
    this.m31 = this.m32 = this.m33 = this.m34 = 0
    this.m41 = this.m42 = this.m43 = this.m44 = 0
    if (!init) return
    if (Array.isArray(init)) {
      this.m11 = this.a = init[0]
      this.m12 = this.b = init[1]
      this.m21 = this.c = init[2]
      this.m22 = this.d = init[3]
      this.m13 = this.e = init[4]
      this.m23 = this.f = init[5]
    }
  }

  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  m11: number;
  m12: number;
  m13: number;
  m14: number;
  m21: number;
  m22: number;
  m23: number;
  m24: number;
  m31: number;
  m32: number;
  m33: number;
  m34: number;
  m41: number;
  m42: number;
  m43: number;
  m44: number;

  invertSelf (): DOMMatrix {
    return new MockDOMMatrix([])
  }

  multiplySelf (other?: any): DOMMatrix {
    return new MockDOMMatrix([])
  }

  preMultiplySelf (other?: any): DOMMatrix {
    return new MockDOMMatrix([])
  }

  rotateAxisAngleSelf (x?: number, y?: number, z?: number, angle?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  rotateFromVectorSelf (x?: number, y?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  rotateSelf (rotX?: number, rotY?: number, rotZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  scale3dSelf (scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  scaleSelf (scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  setMatrixValue (transformList: string): DOMMatrix {
    return new MockDOMMatrix([])
  }

  skewXSelf (sx?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  skewYSelf (sy?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  translateSelf (tx?: number, ty?: number, tz?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  flipX (): DOMMatrix {
    return new MockDOMMatrix([])
  }

  flipY (): DOMMatrix {
    return new MockDOMMatrix([])
  }

  inverse (): DOMMatrix {
    return new MockDOMMatrix([])
  }

  multiply (other?: any): DOMMatrix {
    const { a, b, c, d, e, f } = this
    const newMatrix = [
      a * other.a + c * other.b,
      b * other.a + d * other.b,
      a * other.c + c * other.d,
      b * other.c + d * other.d,
      a * other.e + c * other.f + e,
      b * other.e + d * other.f + f
    ]
    return new MockDOMMatrix(newMatrix)
  }

  rotate (rotX?: number, rotY?: number, rotZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  rotateAxisAngle (x?: number, y?: number, z?: number, angle?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  rotateFromVector (x?: number, y?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  scale (scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  scale3d (scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  /** @deprecated */
  scaleNonUniform (scaleX?: number, scaleY?: number): DOMMatrix {
    throw new Error('')
  }

  skewX (sx?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  skewY (sy?: number): DOMMatrix {
    return new MockDOMMatrix([])
  }

  toFloat32Array (): Float32Array {
    return new Float32Array()
  }

  toFloat64Array (): Float64Array {
    return new Float64Array()
  }

  toJSON (): any {
    return null
  }

  transformPoint (point?: any): DOMPoint {
    const { a, b, c, d, e, f } = this
    const { x, y } = point
    const r = new Point(a * x + c * y + e, b * x + d * y + f)
    return new MockDOMPoint(r)
  }

  translate (tx?: number, ty?: number, tz?: number): MockDOMMatrix {
    return new MockDOMMatrix([])
  }

  toString (): string {
    return 'dd'
  }

  readonly is2D: boolean = true
  readonly isIdentity: boolean = false

  static fromMatrix (other?: any) {
    return new MockDOMMatrix([other.a, other.b, other.c, other.d, other.e, other.f])
  }

  static fromFloat32Array (array32: Float32Array): DOMMatrix {
    return new MockDOMMatrix([])
  }

  static fromFloat64Array (array64: Float64Array): DOMMatrix {
    return new MockDOMMatrix([])
  }
}

class MockDOMPoint {
  x: number = 0
  y: number = 0
  w: number = 0
  z: number = 0

  constructor (point?: any) {
    if (point) {
      const p = point as IPoint
      this.x = p.x
      this.y = p.y
    }
  }

  matrixTransform (point?: any) {
    if (point) {
      const p = point as IPoint
      const m = new MockDOMPoint()
      m.x = p.x
      m.y = p.y
      return m
    }
    return new MockDOMPoint()
  }

  toJSON () {
    return null
  }
}

GlobalMatrixFactory.setInstance(MockDOMMatrix)
