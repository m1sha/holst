import { ChartOptions } from '../chart/chart-options'
import { Scene } from '../core/scene'

export class Chart extends Scene {
  readonly options: ChartOptions
  maxWidth: number
  maxHeight: number
  minHeight: number
  minWidth: number

  constructor (canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas)
    this.maxWidth = 0
    this.minWidth = 0
    this.maxHeight = 0
    this.minHeight = 0
    this.options = options
  }
}
