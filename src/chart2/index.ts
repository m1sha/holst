import { ChartOptions } from '../chart/chart-options'
import { rect } from '../core/utils'
import { LinearChartBuilder } from './linear-chart-builder'

export function createLinearChart (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  const builder = new LinearChartBuilder(canvas, data, options)
  builder.chart.addGraphLayer()
  builder.chart.addAxisesLayer()
  return () => builder.build()
}

export function createLinearChart2 (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  const builder = new LinearChartBuilder(canvas, data, options)
  builder.chart.addGraphLayer()
  const layer = builder.chart.createLayer()
  const shape0 = layer.createShape()
  shape0.rect(rect(0, 0, layer.size.width, layer.size.height))
  shape0.rect(rect(5, 5, layer.size.width - 5, layer.size.height - 10))
  shape0.style.strokeStyle = '#151219'
  const shape = layer.createShape()
  shape.rect(rect(0, 0, 10, 10))
  shape.rect(rect(0, layer.size.height - 10, 10, 10))
  shape.rect(rect(layer.size.width - 10, layer.size.height - 10, 10, 10))
  shape.style.strokeStyle = '#552299'
  return () => builder.build()
}
