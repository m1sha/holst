import { ChartOptions } from '../chart/chart-options'
import { getMax, getMin, roundInt } from '../chart2/utils'
import { LineChartBuilder3 } from './line-chart-builder3'

export function createChartVersion3 (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  if (!canvas) throw new Error("The parameter canvas isn't defined")
  if (data === undefined || data === null) throw new Error("The parameter data isn't defined")
  if (!options) throw new Error("The parameter options isn't defined")

  canvas.style.width = options.width + 'px'
  canvas.style.height = options.height + 'px'
  canvas.width = options.width || 640
  canvas.height = options.height || 480

  const constraints = {
    maxX: data.length,
    maxY: roundInt(getMax(data, 'Value')),
    minX: 0,
    minY: roundInt(getMin(data, 'Value'))
  }
  // if (constraints.minY > 0) constraints.minY = 0
  const builder = new LineChartBuilder3(canvas, data, options)
  builder.constraints = constraints
  builder.textStyle = { color: '#222222', fontSize: '12px', fontName: 'Arial' }
  builder.addBgLayer()
  builder.addGraphLayer()
  builder.addAxisesLayer()
  builder.addNumbers()

  options.onMoveRaw = (_, p) => {
    return builder.onMoveHandler(p)
  }

  return () => builder.build()
}
