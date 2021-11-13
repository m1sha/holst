import { ChartOptions } from './chart-options'
import { getMax, getMin } from './utils'
import { roundInt } from '../tools/round-int'
import { LineChartBuilder3 } from './line-chart-builder3'

export function createChart (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  if (!canvas) throw new Error("The parameter canvas isn't defined")
  if (data === undefined || data === null) throw new Error("The parameter data isn't defined")
  if (!options) throw new Error("The parameter options isn't defined")

  canvas.style.width = options.width + 'px'
  canvas.style.height = options.height + 'px'
  canvas.width = options.width || 640
  canvas.height = options.height || 480

  const constraints = {
    maxX: data.length,
    maxY: options.maxY !== undefined ? options.maxY : roundInt(getMax(data, 'Value'), 0, true),
    minX: 0,
    minY: options.minY !== undefined ? options.minY : roundInt(getMin(data, 'Value'), 0, false)
  }
  // if (constraints.minY > 0) constraints.minY = 0
  const builder = new LineChartBuilder3(canvas, data, options, constraints)
  builder.addBgLayer()
  builder.addGraphLayer()
  builder.addAxisesLayer()
  builder.addNumbers()

  options.onMoveRaw = (_, p) => {
    return builder.onMoveHandler(p)
  }

  return () => builder.build()
}
