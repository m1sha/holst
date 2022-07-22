export class Channels {
  private imageData: ImageData

  constructor (imageData: ImageData) {
    this.imageData = imageData
  }

  get r () {
    return this.extract(0)
  }

  get g () {
    return this.extract(1)
  }

  get b () {
    return this.extract(2)
  }

  get a () {
    return this.extract(3)
  }

  private extract (n: number) {
    let j = 0
    const len = this.imageData.data.length
    const result = new Uint8ClampedArray(Math.floor(len / 4))
    for (let i = 0; i < len; i += 4) result[j++] = this.imageData.data[i + n]
    return result
  }
}
