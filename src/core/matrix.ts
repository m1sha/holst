import { Point, IPoint } from './point'

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

  scale (point: IPoint): Matrix2D {
    this.matrix = this.matrix.multiply(MatrixFactory.fromMatrix({ a: point.x, d: point.y }))
    return this
  }

  rotate (angle: number): Matrix2D {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    this.matrix = this.matrix.multiply(MatrixFactory.fromMatrix({ a: cos, b: -sin, c: sin, d: cos }))
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

  static get identity (): Matrix2D {
    return matrix(1, 0, 0, 1, 0, 0)
  }
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
    return eval('this.instance.fromMatrix(m)') as DOMMatrix
  }
}

const GlobalMatrixFactory = {
  setInstance (u: any) {
    MatrixFactory.instance = u
    eval('MatrixFactory.create = arr => new u(arr)')
  }
}

export { GlobalMatrixFactory }
