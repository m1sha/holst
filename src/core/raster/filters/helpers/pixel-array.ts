import { IImageData } from './image-data'

export class PixelArray {
  private readonly data: Uint8ClampedArray
  imageData: IImageData
  constructor (imageData: IImageData) {
    this.imageData = imageData
    this.data = this.imageData.data
  }

  getU32 (index: number): number {
    const i = index * 4
    return (this.data[i] << 16) | (this.data[i + 1] << 8) | this.data[i + 2]
  }

  setU32 (index: number, u32: number): void {
    const i = index * 4
    this.data[i] = (u32 & 0xff0000) >> 16
    this.data[i + 1] = (u32 & 0x00ff00) >> 8
    this.data[i + 2] = u32 & 0x0000ff
  }

  getRGB (index: number): number[] {
    const i = index * 4
    return [this.data[i], this.data[i + 1], this.data[i + 2]]
  }

  setRGB (index: number, rgb: number[]): void {
    if (!rgb || rgb.length !== 3) throw new Error('The rgb array length must be 3')
    const i = index * 4
    this.data[i] = rgb[0]
    this.data[i + 1] = rgb[1]
    this.data[i + 2] = rgb[2]
  }
}
