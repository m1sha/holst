import { ChartOptions } from '../chart/chart-options'
import { LinearChart } from './linear-chart'

export class LinearChartBuilder {
  readonly chart: LinearChart
  constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
    this.chart = new LinearChart(canvas, data, options)
  }

  build () {
    this.chart.build()
  }
}
