import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { Scene } from '../core/scene'
import { Legend } from './chart-options'

export class ChartBase extends Scene {
  maxHeight: number
  maxWidth: number
  minHeight: number
  padding: Padding
  legend: Legend

  constructor (canvas: HTMLCanvasElement) {
    super(canvas)
    this.padding = { top: 8, left: 8, bottom: 8, right: 8 }
    this.maxHeight = this.bounds.height
    this.maxWidth = this.bounds.width
    this.minHeight = 0
    this.legend = {}
  }

  get delta (): Point {
    const width = this.bounds.width
    const height = this.bounds.height
    const padding = this.padding
    const maxWidth = this.maxWidth
    const maxHeight = this.maxHeight
    return {
      x: (width - (padding.right + padding.left)) / maxWidth,
      y: (height - (padding.top + padding.bottom)) / maxHeight
    }
  }

  getPoint (valueX: number, valueY: number): Point {
    return {
      x: valueX * this.delta.x + this.padding.left,
      y: this.bounds.height - ((valueY * this.delta.y) + this.padding.bottom)
    }
  }
}
