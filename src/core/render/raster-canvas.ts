import { Color } from '../../core/colors/color'
import { Size } from '../../core/geometry/size'
import { IPoint } from '../../core/geometry/point'
import { Raster } from '../../core/raster'
import { fillRegion } from '../../core/raster/fill-region'

export class RasterCanvas {
  private canvas: HTMLCanvasElement
  private raster: Raster
  private ctx: CanvasRenderingContext2D
  private path2d: Path2D
  backgroundColor: Color
  foregroundColor: Color
  lineWidth: number = 1

  constructor (raster: Raster) {
    this.raster = raster
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    this.backgroundColor = Color.white
    this.foregroundColor = Color.orange
    this.path2d = new Path2D()
    if (raster.distRect) this.setSize(raster.distRect)
  }

  setSize ({ width, height }: Size) {
    this.canvas.width = width
    this.canvas.height = height
  }

  fillRegion ({ x, y }: IPoint, color: Color) {
    const imageData = this.raster.getData()
    fillRegion(imageData, { x, y }, color)
    this.raster.setData(imageData)
  }

  penStart ({ x, y }: IPoint) {
    // this.ctx.save()
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!
    if (this.raster.distRect) this.setSize(this.raster.distRect)
    this.ctx.translate(0.5, 0.5)
    this.ctx.strokeStyle = this.foregroundColor.toString()
    this.ctx.lineWidth = this.lineWidth
    // this.path2d = new Path2D()
    this.ctx.moveTo(x, y)
  }

  penMove ({ x, y }: IPoint) {
    this.ctx.lineTo(x, y)
    // this.path2d.closePath()
    this.ctx.stroke()
    // this.ctx.restore()
    this.merge()
  }

  brush ({ x, y }: IPoint, r: number) {
    this.ctx.save()
    this.ctx.translate(0.5, 0.5)
    this.ctx.fillStyle = this.foregroundColor.toString()
    this.path2d = new Path2D()
    this.path2d.arc(x, y, r, 0.001, Math.PI * 2)
    this.ctx.fill(this.path2d)
    this.ctx.restore()
    this.merge()
  }

  setPixel ({ x, y }: IPoint) {
    this.ctx.save()
    this.ctx.translate(0.5, 0.5)
    this.ctx.fillStyle = this.foregroundColor.toString()
    this.path2d = new Path2D()
    this.path2d.rect(x, y, 1, 1)
    this.ctx.fill(this.path2d)
    this.ctx.restore()
    this.merge()
  }

  getPixel ({ x, y }: IPoint) {
    const s = this.ctx.getImageData(x, y, 1, 1)
    const r = s.data[0]
    const g = s.data[1]
    const b = s.data[2]
    return new Color(r, g, b)
  }

  private merge () {
    this.raster.merge(this.canvas)
  }
}
