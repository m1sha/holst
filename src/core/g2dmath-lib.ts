import init, { sum } from 'g2dmath'

export class G2dMath {
  private static loaded = false
  static sum (a: number, b: number) {
    if (!this.loaded) throw new Error('g2dmath_bg.wasm is not loaded.')
    return sum(a, b)
  }

  static async load () {
    await init('../../node_modules/g2dmath/g2dmath_bg.wasm')
    this.loaded = true
  }
}
