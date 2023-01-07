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
    this.foregroundColor = Color.orange

    if (size) this.setSize(size)
  }

  get data () {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  setSize ({ width, height }: Size) {
    this.canvas.width = width
    this.canvas.height = height
  }

  penStart ({ x, y }: IPoint) {
    this.ctx.strokeStyle = this.foregroundColor.toString()
    // this.ctx.translate(-0.5, -0.5)
    this.ctx.beginPath()
    this.ctx.moveTo(x - 0.5, y - 0.5)
  }

  penMove ({ x, y }: IPoint) {
    this.ctx.lineTo(x - 0.5, y - 0.5)
    this.ctx.stroke()
    // this.ctx.closePath()
  }
}
