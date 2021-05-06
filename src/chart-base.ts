import { Padding } from './padding'
import { Point } from './point'
import { Scene } from './scene'

export class ChartBase extends Scene {
  maxHeight: number
  maxWidth: number
  minHeight: number
  padding: Padding

  constructor (canvas: HTMLCanvasElement) {
    super(canvas)
    this.padding = { top: 8, left: 8, bottom: 8, right: 8 }
    this.maxHeight = this.bounds.height
    this.maxWidth = this.bounds.width
    this.minHeight = 0
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
