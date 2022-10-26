import { IImageData } from './image-data'
import { Matrix3x3, Matrix3x3ReadOnly } from './matrix3x3'

export class PixelMatrix {
  private imageData: IImageData
  private splitter: number
  private moduloWidth: number = 0
  private moduloHeight: number = 0
  private countByWidth: number = 0
  private countByHeight: number = 0

  constructor (imageData: IImageData, splitter: '3x3') {
    this.imageData = imageData
    this.splitter = splitter === '3x3' ? 3 : 4
    this.countByWidth = Math.floor(this.imageData.width / this.splitter)
    this.moduloWidth = this.imageData.width % this.splitter
    if (this.moduloWidth > 0) this.countByWidth++
    this.countByHeight = Math.floor(this.imageData.height / this.splitter)
    this.moduloHeight = this.imageData.height % this.splitter
    if (this.moduloHeight > 0) this.countByHeight++
  }

  getMatrix3x3 (index: number): Matrix3x3ReadOnly[] {
    const cr: number[] = []
    const cg: number[] = []
    const cb: number[] = []
    const shift = index * this.splitter * 4
    let counter = shift
    for (let iteration = 0; iteration < this.splitter; iteration++) {
      for (let i = 0; i < this.splitter; i++) {
        const r = this.imageData.data[counter]
        const g = this.imageData.data[++counter]
        const b = this.imageData.data[++counter]
        cr.push(r)
        cg.push(g)
        cb.push(b)
        counter += 2 // alpha + next
      }

      counter += this.imageData.width * 4 - this.splitter * 4
    }
    return [Matrix3x3.from(cr), Matrix3x3.from(cg), Matrix3x3.from(cb)]
  }

  setMatrix3x3 (index: number, matrix3x3: Matrix3x3ReadOnly) {

  }

  get length () : number {
    return this.countByWidth * this.countByHeight
  }
}
