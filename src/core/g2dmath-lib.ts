import init, { gaussian_blur } from 'g2dmath'

export class G2dMath {
  private static loaded = false
  static gaussianBlur (a: Uint32Array, b: Uint32Array, w: number, h: number, sigma: number) {
    if (!this.loaded) throw new Error('g2dmath_bg.wasm is not loaded.')
    return gaussian_blur(a, b, w, h, sigma)
  }

  static async load () {
    await init('../../node_modules/g2dmath/g2dmath_bg.wasm')
    this.loaded = true
  }
}
