import { ChartOptions } from '../chart/chart-options'
import { LinearChart } from './linear-chart'

export function createLinearChart (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  const chart = new LinearChart(canvas, data, options)
  return () => chart.build()
}
