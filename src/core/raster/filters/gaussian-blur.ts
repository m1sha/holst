import { Channels } from '../channels'
import { gaussianBlur } from '../gaussian-blur'
import { Filter } from './filter'

export class GaussianBlur implements Filter {
  radius: number

  constructor (radius: number) {
    if (!radius || radius < 1) throw new Error('The radius must be a positive integer and greater than zero')
    this.radius = radius
  }

  apply (imageData: ImageData) {
    const channels = new Channels(imageData, true)
    gaussianBlur(channels.r, imageData.width, imageData.height, this.radius)
    gaussianBlur(channels.g, imageData.width, imageData.height, this.radius)
    gaussianBlur(channels.b, imageData.width, imageData.height, this.radius)
    channels.update()
  }
}
