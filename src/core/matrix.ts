import { Point, IPoint } from './geometry/point'

// interface IDOMMatrix2D {
//   rotate (deg: number): void
//   scale (x: number, y: number): void
//   translate (x: number, y: number): void
//   multiply (m: DOMMatrix): DOMMatrix
// }

export class Matrix2D {
  private matrix: DOMMatrix

  get a (): number {
    return this.matrix.a
  }

  set a (value: number) {
    this.matrix.a = value
  }

  get b (): number {
    return this.matrix.b
  }

  set b (value: number) {
    this.matrix.b = value
  }

  get c (): number {
    return this.matrix.c
  }

  set c (value: number) {
    this.matrix.c = value
  }

  get d (): number {
    return this.matrix.d
  }

  set d (value: number) {
    this.matrix.d = value
  }

  get e (): number {
    return this.matrix.e
  }

  set e (value: number) {
    this.matrix.e = value
  }

  get f (): number {
    return this.matrix.f
  }

  set f (value: number) {
    this.matrix.f = value
  }

  constructor (m?: { a?: number; b?: number; c?: number; d?: number; e?: number; f?: number }) {
    if (!m) throw new Error()
    const { a, b, c, d, e, f } = m
    MatrixFactory.checkInit()
    this.matrix = MatrixFactory.create([a || 0, b || 0, c || 0, d || 0, e || 0, f || 0])
  }

  scale (scale: IPoint, point?: IPoint): Matrix2D {
    let m = new DOMMatrix()
    m = point ? m.translate(point.x, point.y).scale(scale.x, scale.y).translate(-point.x, -point.y) : m.scale(scale.x, scale.y)
    this.matrix = this.matrix.multiply(m)
    return this
  }

  rotate (angle: number, point?: IPoint): Matrix2D {
    let m = new DOMMatrix()
    m = point ? m.translate(point.x, point.y).rotate(angle).translate(-point.x, -point.y) : m.rotate(angle)
    this.matrix = this.matrix.multiply(m)
    return this
  }

  translate (point: IPoint): Matrix2D {
    let m = new DOMMatrix()
    m = m.translate(point.x, point.y)
    this.matrix = this.matrix.multiply(m)
    return this
  }

  flipX (point?: IPoint) {
    let m = new DOMMatrix()
    m = point ? m.translate(point.x, point.y).flipX().translate(-point.x, -point.y) : m.flipX()
    this.matrix = this.matrix.multiply(m)
    return this
  }

  flipY (point?: IPoint) {
    let m = new DOMMatrix()
    m = point ? m.translate(point.x, point.y).flipY().translate(-point.x, -point.y) : m.flipY()
    this.matrix = this.matrix.multiply(m)
    return this
  }

  mul (m: Matrix2D): Matrix2D {
    this.matrix = this.matrix.multiply(MatrixFactory.fromMatrix(m))
    return this
  }

  applyMatrix (p: IPoint): Point {
    return new Point(this.matrix.transformPoint(p))
  }

  copy () {
    return new Matrix2D(this)
  }

  equals (m: Matrix2D): boolean {
    return this.a === m.a && this.b === m.b && this.b === m.b &&
    this.d === m.d && this.e === m.e && this.f === m.f
  }

  static get identity (): Matrix2D {
    return identity()
  }

  // private get instance () {
  //   return (MatrixFactory.instance as unknown) as IDOMMatrix2D
  // }
}

export function identity (): Matrix2D {
  return matrix(1, 0, 0, 1, 0, 0)
}

export function matrix (a: number, b: number, c: number, d: number, e: number, f: number): Matrix2D {
  return new Matrix2D({ a, b, c, d, e, f })
}

const MatrixFactory = {
  instance: null,
  create: (arr: number[]): DOMMatrix => {
    return new DOMMatrix(arr)
  },
  checkInit () {
    if (!this.instance) {
      eval('this.instance = DOMMatrix')
    }
  },
  fromMatrix (m?: { a?: number; b?: number; c?: number; d?: number; e?: number; f?: number }): DOMMatrix {
    return (this.instance!! as any).fromMatrix(m) as DOMMatrix
  }
}

const GlobalMatrixFactory = {
  setInstance (u: any) {
    MatrixFactory.instance = u
    eval('MatrixFactory.create = arr => new u(arr)')
  }
}

export { GlobalMatrixFactory }
