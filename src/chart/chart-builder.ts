import { ChartBase } from './chart-base'
import { ChartOptions } from './chart-options'
import { getMax, roundInt } from './utils'
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
      const { maxWidth, maxHeight, minWidth, minHeight } = this.calculateBoundary()
      this.chart.legend = options.legend || {}
      this.chart.maxWidth = maxWidth
      this.chart.maxHeight = maxHeight
      this.chart.minWidth = minWidth
      this.chart.minHeight = minHeight
      const paddingLeft = this.chart.createLayer().measureText(this.chart.maxHeight.toString(), {}).width + 35
      this.chart.padding = this.options?.chartStyle?.padding || { top: 25, left: paddingLeft, bottom: 70, right: 50 }
      this.viewport = new Viewport(this.chart.size, this.chart.padding)
    }

    build () {
      this.chart.render()
    }

    protected calculateBoundary (): { maxWidth: number, maxHeight: number, minWidth: number, minHeight: number } {
      if (this.options.onCalculateBoundary) {
        return this.options.onCalculateBoundary(this.data, this.options)
      }

      return {
        maxWidth: this.data.length,
        maxHeight: roundInt(getMax(this.data, this.options.yFieldName)),
        minWidth: 0,
        minHeight: 0 // getMin(this.data, this.options.yFieldName)
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
