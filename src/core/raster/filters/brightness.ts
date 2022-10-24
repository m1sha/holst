import { Filter } from './filter'

export class Brightness implements Filter {
  brightness: number

  constructor (brightness: number) {
    this.brightness = brightness
  }

  apply (imageData: ImageData) {
    const truncate = (x: number) => {
      if (x < 0) return 0
      if (x > 255) return 255
      return x
    }

    const br = this.brightness
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      data[i] = truncate(data[i] + br)
      data[i + 1] = truncate(data[i + 1] + br)
      data[i + 2] = truncate(data[i + 2] + br)
    }
  }
}
