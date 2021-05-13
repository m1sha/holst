import { ChartBase } from './chart-base'
import { ChartOptions } from './chart-options'
import { getMaxFromObject, roundInt } from './utils'
import { Viewport } from '../core/viewport'

export class ChartBuilder {
    protected readonly chart: ChartBase
    protected readonly data: []
    protected readonly options: ChartOptions
    protected readonly viewport: Viewport

    constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
      this.data = data
      this.options = options
      this.chart = new ChartBase(canvas)
      const { width, height } = this.calculateBoundary()
      this.chart.legend = options.legend || {}
      this.chart.maxWidth = width
      this.chart.maxHeight = height
      this.chart.padding = this.options?.chartStyle?.padding || { top: 25, left: 50, bottom: 70, right: 50 }
      this.viewport = new Viewport(this.chart.bounds, this.chart.padding)
    }

    build () {
      this.chart.render()
    }

    protected calculateBoundary (): { width: number, height: number } {
      if (this.options.onCalculateBoundary) {
        return this.options.onCalculateBoundary(this.data, this.options)
      }

      return {
        width: this.data.length,
        height: roundInt(getMaxFromObject(this.data, this.options.yFieldName))
      }
    }

    protected getXValue (obj: unknown) {
      const value = obj[this.options.xFieldName]
      if (value === undefined || value === null) throw new Error('X value is not defined')
      return value
    }

    protected getYValue (obj: unknown) {
      const value = obj[this.options.yFieldName]
      if (value === undefined || value === null) throw new Error('Y value is not defined')
      return value
    }

    protected getDisplayValues (item: unknown) {
      let xValue: unknown = this.getXValue(item)
      if (this.options.xFieldDisplayFormat) {
        xValue = this.options.xFieldDisplayFormat(xValue)
      }
      let yValue: unknown = this.getYValue(item)
      if (this.options.yFieldDisplayFormat) {
        yValue = this.options.yFieldDisplayFormat(yValue)
      }
      return { xValue, yValue }
    }
}
