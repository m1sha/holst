import { ChartOptions } from './chart-options'
import { LineChartBuilder } from './line-chart-builder'

export function createChart (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  if (!canvas) throw new Error("The parameter canvas isn't defined")
  if (data === undefined || data === null) throw new Error("The parameter data isn't defined")
  if (!options) throw new Error("The parameter options isn't defined")

  canvas.width = options.width || 640
  canvas.height = options.height || 480
  const builder = new LineChartBuilder(canvas, data, options)
    .addBgLayer()
    .addAxisesLayer()
    .addThresholdLayer()
    .addGridLayer()
    .addNumbers()
    .addGraphLayer()
  return () => builder.build()
}
