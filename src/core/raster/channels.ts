export class Channels {
  private imageData: ImageData

  constructor (imageData: ImageData) {
    this.imageData = imageData
  }

  get r () {
    const channel = this.extract(0)
    return {
      channel,
      toArray: () => Array.from(channel.map(p => Number(p)))
    }
  }

  get g () {
    const channel = this.extract(1)
    return {
      channel,
      toArray: () => Array.from(channel.map(p => Number(p)))
    }
  }

  get b () {
    const channel = this.extract(2)
    return {
      channel,
      toArray: () => Array.from(channel.map(p => Number(p)))
    }
  }

  get a () {
    const channel = this.extract(3)
    return {
      channel,
      toArray: () => Array.from(channel.map(p => Number(p)))
    }
  }

  private extract (n: number) {
    const extractor = (i: number, j: { value: number }, c: number) => {
      if (i === j.value + c) {
        j.value += 4 // count of channels always are four
        return true
      }
      return false
    }
    const j = { value: 0 }
    return this.imageData.data.filter((_, i) => extractor(i, j, n))
  }
}
