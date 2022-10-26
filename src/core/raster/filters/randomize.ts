import { Filter } from './filter'
import { truncate } from './helpers/truncate'

export class Randomize implements Filter {
  private value: number
  private monochromic: boolean

  constructor (value: number, monochromic?: boolean) {
    this.value = value
    this.monochromic = monochromic ?? false
  }

  apply (imageData: ImageData) {
    const data = imageData.data
    const seed = () => Math.random() * this.value
    const sign = () => Math.random() > 0.5 ? -1 : 1

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() > 0.5) continue
      if (this.monochromic) {
        const v = truncate((data[i] + data[i + 1] + data[i + 2]) / 3 + seed() * sign())
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
      } else {
        data[i] = truncate(data[i] + seed() * sign())
        data[i + 1] = truncate(data[i + 1] + seed() * sign())
        data[i + 2] = truncate(data[i + 2] + seed() * sign())
      }
    }
  }
}
