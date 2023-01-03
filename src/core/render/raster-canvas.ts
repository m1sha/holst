import { Color } from '../../core/colors/color'
import { Size } from '../../core/geometry/size'
import { IPoint } from '../../core/geometry/point'

export class RasterCanvas {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  backgroundColor: Color
  foregroundColor: Color

  constructor (size?: Size) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    this.backgroundColor = Color.white
    this.foregroundColor = Color.black

    if (size) this.setSize(size)
  }

  get data () {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  setSize ({ width, height }: Size) {
    this.canvas.width = width
    this.canvas.height = height
  }

  pen ({ x, y }: IPoint) {
    this.ctx.fillStyle = this.foregroundColor.toString()
    this.ctx.beginPath()
    this.ctx.rect(x, y, 1, 1)
    this.ctx.closePath()
  }
}
