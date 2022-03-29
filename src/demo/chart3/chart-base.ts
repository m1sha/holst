import { Padding } from '../../core/padding'
import { Point } from '../../core/point'
import { Scene } from '../../core/scene'
import { Legend } from './chart-options'

export class ChartBase extends Scene {
  maxHeight: number
  maxWidth: number
  minHeight: number
  minWidth: number
  padding: Padding
  legend: Legend

  constructor (canvas: HTMLCanvasElement) {
    super(canvas)
    this.padding = { top: 8, left: 8, bottom: 8, right: 8 }
    this.maxHeight = this.size.height
    this.maxWidth = this.size.width
    this.minHeight = 0
    this.minWidth = 0
    this.legend = {}
  }

  get ratio (): Point {
    const width = this.size.width
    const height = this.size.height
    const padding = this.padding
    const maxWidth = this.maxWidth
    const maxHeight = this.maxHeight
    const minHeight = this.minHeight
    const minWidth = this.minWidth
    return new Point({
      x: (width - (padding.right + padding.left)) / (maxWidth - minWidth),
      y: (height - (padding.top + padding.bottom)) / (maxHeight - minHeight)
    })
  }

  getPoint (valueX: number, valueY: number): Point {
    return new Point({
      x: (valueX * this.ratio.x) + this.padding.left,
      y: this.size.height - ((valueY * this.ratio.y) + this.padding.bottom)
    })
  }
}
