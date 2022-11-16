export class Channels {
  private useCache: boolean
  #r: Uint8ClampedArray | null = null
  #g: Uint8ClampedArray | null = null
  #b: Uint8ClampedArray | null = null
  #a: Uint8ClampedArray | null = null

  private imageData: ImageData

  constructor (imageData: ImageData, useCache: boolean = false) {
    this.imageData = imageData
    this.useCache = useCache
  }

  get r () {
    if (!this.useCache) return this.extract(0)
    if (this.#r) return this.#r
    return (this.#r = this.extract(0))
  }

  get g () {
    if (!this.useCache) return this.extract(1)
    if (this.#g) return this.#g
    return (this.#g = this.extract(1))
  }

  get b () {
    if (!this.useCache) return this.extract(2)
    if (this.#b) return this.#b
    return (this.#b = this.extract(2))
  }

  get a () {
    if (!this.useCache) return this.extract(3)
    if (this.#a) return this.#a
    return (this.#a = this.extract(3))
  }

  get length () {
    return Math.floor(this.imageData.data.length / 4)
  }

  update () {
    if (!this.useCache) throw new Error('supported only when using channel cache')
    const len = this.imageData.data.length
    const data = this.imageData.data
    let j = 0
    for (let i = 0; i < len; i += 4) {
      if (this.#r) data[i] = this.#r[j]
      if (this.#g) data[i + 1] = this.#g[j]
      if (this.#b) data[i + 2] = this.#b[j]
      if (this.#a) data[i + 3] = this.#a[j]
      j++
    }
  }

  private extract (n: number) {
    let j = 0
    const len = this.imageData.data.length
    const result = new Uint8ClampedArray(Math.floor(len / 4))
    for (let i = 0; i < len; i += 4) result[j++] = this.imageData.data[i + n]
    return result
  }
}
