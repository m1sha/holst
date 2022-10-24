import { Filter } from './filter'

export class GreyScale implements Filter {
  apply (imageData: ImageData) {
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const g = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = g
      data[i + 1] = g
      data[i + 2] = g
    }
  }
}
