import init, { gaussianBlur, extract } from 'g2dmath'

export class G2dMath {
  private static loaded = false
  static gaussianBlur (a: Uint8ClampedArray, w: number, h: number, sigma: number) {
    if (!this.loaded) throw new Error('g2dmath_bg.wasm is not loaded.')
    const b = gaussianBlur(a, w, h, sigma)
    for (let i = 0; i < a.length; i++) a[i] = b[i]
  }

  static extractCannel (src: Uint8ClampedArray, n: number) {
    if (!this.loaded) throw new Error('g2dmath_bg.wasm is not loaded.')
    return extract(src, n)
  }

  static async load () {
    await init('../../node_modules/g2dmath/g2dmath_bg.wasm')
    this.loaded = true
  }
}
