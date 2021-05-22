import { ChartOptions } from '../chart/chart-options'
import colors from '../chart/colors'
import metric from '../core/metric'
import { point, rect } from '../core/utils'
import { Chart } from './chart'

export class LinearChart extends Chart {
  private readonly data: []

  constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
    super(canvas, options)
    this.data = data
    this.maxHeight = 200
    this.maxWidth = 17
    this.minHeight = 0

    const layer = this.createLayer()
    const s = layer.createShape()
    s.rect(layer.bounds)
    s.style.strokeStyle = '#333'

    const s2 = layer.createShape()

    s2.rect(rect(20, 20, 10, 10))

    s2.rect(rect(210, 135, 100, 100))

    // s2.lineH(point(0, 10), 50)
    // s2.lineV(point(0, 0), 50)
    // s2.lineH(point(0, 50), 50)
    // s2.lineV(point(50, 0), 50)
    s2.style.strokeStyle = '#939'
    this.addGraphLayer()
    this.addAxisesLayer()
  }

  addGraphLayer () {
    const layer = this.createLayer()

    layer.location.x = 10
    layer.location.y = 10
    layer.size.width += -40
    layer.size.height += -40
    layer.createMask()
    const s = layer.createShape()
    s.style.strokeStyle = '#f00'
    s.rect(rect(0, 0, layer.size.width, layer.size.height))

    const shape = layer.createShape()
    shape.style.strokeStyle = this.options.chartStyle?.colors?.graphColor || colors.graphColor
    shape.style.lineWidth = this.options.chartStyle?.graphLineWidth || 2
    const ratio = metric.getRatio(this, rect(0, 0, layer.size.width, layer.size.height))
    let i = 0
    for (const item of this.data) {
      const x = i++ * ratio.x
      const y = item[this.options.yFieldName] * ratio.y
      const p = { x, y }
      shape.lineTo(p)
      shape.moveTo(p)
    }
    return this
  }

  addAxisesLayer () {
    const layer = this.createLayer()

    const s = layer.createShape()
    s.style.strokeStyle = '#0000fd'

    s.lineH(point(10, 10), layer.size.width - 40)
    s.lineV(point(10, 10), layer.size.height - 40)
  }

  build () {
    this.render()
  }
}
