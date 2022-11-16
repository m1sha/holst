export interface Matrix3x3ReadOnly {
  a11: number
  a12: number
  a13: number
  a21: number
  a22: number
  a23: number
  a31: number
  a32: number
  a33: number

  toArray (): Readonly<number[]>
}

export class Matrix3x3 implements Matrix3x3ReadOnly {
  a11: number = 0
  a12: number = 0
  a13: number = 0
  a21: number = 0
  a22: number = 0
  a23: number = 0
  a31: number = 0
  a32: number = 0
  a33: number = 0

  constructor (
    a11?: number, a12?: number, a13?: number,
    a21?: number, a22?: number, a23?: number,
    a31?: number, a32?: number, a33?: number
  ) {
    this.a11 = a11 ?? 0; this.a12 = a12 ?? 0; this.a13 = a13 ?? 0
    this.a21 = a21 ?? 0; this.a22 = a22 ?? 0; this.a23 = a23 ?? 0
    this.a31 = a31 ?? 0; this.a32 = a32 ?? 0; this.a33 = a33 ?? 0
  }

  mul (a: number): Matrix3x3
  // eslint-disable-next-line no-dupe-class-members
  mul (m: Matrix3x3): Matrix3x3
  // eslint-disable-next-line no-dupe-class-members
  mul (...args: Array<any>): Matrix3x3 {
    if (args.length === 1 && args[0] instanceof Matrix3x3) {
      const m = args[0]
      const c11 = this.a11 * m.a11 + this.a12 * m.a21 + this.a13 * m.a31
      const c12 = this.a11 * m.a12 + this.a12 * m.a22 + this.a13 * m.a32
      const c13 = this.a11 * m.a13 + this.a12 * m.a23 + this.a13 * m.a33
      const c21 = this.a21 * m.a11 + this.a22 * m.a21 + this.a23 * m.a31
      const c22 = this.a21 * m.a12 + this.a22 * m.a22 + this.a23 * m.a32
      const c23 = this.a21 * m.a13 + this.a22 * m.a23 + this.a23 * m.a33
      const c31 = this.a31 * m.a11 + this.a32 * m.a21 + this.a33 * m.a31
      const c32 = this.a31 * m.a12 + this.a32 * m.a22 + this.a33 * m.a32
      const c33 = this.a31 * m.a13 + this.a32 * m.a23 + this.a33 * m.a33

      return new Matrix3x3(c11, c12, c13, c21, c22, c23, c31, c32, c33)
    }

    if (args.length === 1 && typeof args[0] === 'number') {
      const a = args[0]
      return new Matrix3x3(
        this.a11 * a, this.a12 * a, this.a13 * a,
        this.a21 * a, this.a22 * a, this.a23 * a,
        this.a31 * a, this.a32 * a, this.a33 * a
      )
    }

    throw new Error("args aren't supported")
  }

  mulSelf (a: number): void
  // eslint-disable-next-line no-dupe-class-members
  mulSelf (m: Matrix3x3): void
  // eslint-disable-next-line no-dupe-class-members
  mulSelf (...args: Array<any>): void {
    let c: Matrix3x3 | null = null

    if (args.length === 1 && typeof args[0] === 'number') {
      c = this.mul(args[0])
    }

    if (args.length === 1 && args[0] instanceof Matrix3x3) {
      c = this.mul(args[0])
    }

    if (!c) {
      throw new Error("args aren't supported")
    }

    this.a11 = c.a11; this.a12 = c.a12; this.a13 = c.a13
    this.a21 = c.a21; this.a22 = c.a22; this.a23 = c.a23
    this.a31 = c.a31; this.a32 = c.a32; this.a33 = c.a33
  }

  toArray (): Readonly<number[]> {
    return [
      this.a11, this.a12, this.a13,
      this.a21, this.a22, this.a23,
      this.a31, this.a32, this.a33
    ]
  }

  toString () {
    return `${this.a11}\t${this.a11}\t${this.a11}\n${this.a21}\t${this.a21}\t${this.a21}\n${this.a31}\t${this.a31}\t${this.a31}\n`
  }

  static get identity (): Matrix3x3 {
    return new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1)
  }

  static from (arr: number[]) {
    if (arr.length !== 9) throw new Error('The array has not supported dimension')
    return new Matrix3x3(
      arr[0], arr[1], arr[2],
      arr[3], arr[4], arr[5],
      arr[6], arr[7], arr[8]
    )
  }
}
