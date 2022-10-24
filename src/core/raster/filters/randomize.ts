import { Filter } from './filter'
import { truncate } from './helpers/truncate'

export class Randomize implements Filter {
  private value: number

  constructor (value: number) {
    this.value = value
  }

  apply (imageData: ImageData) {
    const data = imageData.data
    const seed = () => Math.random() * this.value
    const sign = () => Math.random() > 0.5 ? -1 : 1

    for (let i = 0; i < data.length; i += 4) {
      data[i] = truncate(data[i] + seed() * sign())
      data[i + 1] = truncate(data[i + 1] + seed() * sign())
      data[i + 2] = truncate(data[i + 2] + seed() * sign())
    }
  }
}
