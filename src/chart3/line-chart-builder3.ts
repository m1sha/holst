import { createCorner } from '../chart/bg-templates'
import { ChartOptions } from '../chart/chart-options'
import { LineChartBuilder } from '../chart/line-chart-builder'
import { AnimationController } from '../core/animation'
import { Constraints } from '../core/constraints'
import { Layer } from '../core/layers'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { padding, point } from '../core/utils'
import { Viewport } from '../core/viewport'
import { createTooltipWindow } from '../tooltip'
import styles from './styles'

export class LineChartBuilder3 extends LineChartBuilder {
  private readonly constraints: Constraints
  private readonly testLayer: Layer
  private readonly ratio: Point
  private readonly minY: number
  private readonly maxX: number
  private readonly absMinY: number
  private readonly absMaxY: number
  private readonly offsetY: number
  private readonly xSegmentCount: number
  private readonly ySegmentCount: number

  constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions, constraints: Constraints) {
    super(canvas, data, options)
    this.constraints = constraints
    this.testLayer = this.createLayer()
    this.ratio = this.testLayer.ratio
    this.minY = this.constraints.minY
    this.absMinY = Math.abs(this.minY)
    this.offsetY = (this.minY < 0 ? this.absMinY : 0)
    this.absMaxY = Math.abs(this.constraints.maxY)
    this.maxX = constraints.maxX
    this.xSegmentCount = this.options.xSegmentCount || 10
    this.ySegmentCount = this.options.ySegmentCount || 10
  }

  addGraphLayer (): this | LineChartBuilder3 {
    const { ratio, absMinY, offsetY } = this
    const layer = this.createLayer()
    const controller = new AnimationController(this.chart)
    controller.onFrameChange(num => {
      layer.clear()
      const graph = layer.createShape(styles.graphLine)
      const points = []
      let i = 0
      const len = controller.maxFrames / this.data.length
      for (const item of this.data) {
        if (num < len * i) break
        const x = i++
        const valueY = this.getYValue(item)
        const y = valueY < 0 ? absMinY - Math.abs(valueY) : valueY + offsetY
        points.push({ x: x * ratio.x, y: y * ratio.y })
      }
      graph.polyline(points)
    })

    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const layer = this.createLayer()
    const { ratio, absMinY, absMaxY, offsetY, maxX, ySegmentCount, xSegmentCount } = this
    const topY = (absMaxY + offsetY) * ratio.y

    const axises = layer.createShape(styles.axises)
    axises.lineH({ x: 0, y: offsetY * ratio.y }, layer.size.width)
    axises.lineV({ x: 0, y: 0 }, topY)

    const segmentHeight = absMaxY / ySegmentCount
    const segments = layer.createShape(styles.segments)
    for (let i = 1; i <= ySegmentCount; i++) {
      const y = (Math.abs(i * segmentHeight) + offsetY) * ratio.y
      segments.lineH(point(-5, y), layer.size.width + 5)
    }
    for (let i = 1; i <= ySegmentCount; i++) {
      if (absMinY < Math.abs(i * segmentHeight)) break
      const y = (absMinY - Math.abs(i * segmentHeight)) * ratio.y
      segments.lineH(point(-5, y), layer.size.width)
    }

    const segmentWidth = maxX / xSegmentCount
    for (let i = 1; i <= xSegmentCount; i++) {
      const x = Math.abs(i * segmentWidth) * ratio.x
      segments.lineV(point(x, 0), topY)
    }

    return this
  }

  addNumbers (): this | LineChartBuilder {
    const { ratio, minY, absMinY, absMaxY, offsetY, maxX, ySegmentCount, xSegmentCount } = this
    const layer = this.createLayer()
    const style = styles.axisText

    // if (minY <= 0) {
    const text = { value: '0', x: () => -15, y: () => offsetY * ratio.y, style }
    layer.createText(text)
    // }

    const segmentHeight = absMaxY / ySegmentCount
    for (let i = 1; i <= ySegmentCount; i++) {
      const y = (Math.abs(i * segmentHeight) + offsetY) * ratio.y
      const text = { value: (i * segmentHeight).toString(), x: w => -w - 10, y: () => y, style }
      layer.createText(text)
    }

    if (minY < 0) {
      for (let i = 1; i <= ySegmentCount; i++) {
        if (absMinY < Math.abs(i * segmentHeight)) break
        const y = (absMinY - Math.abs(i * segmentHeight)) * ratio.y
        const text = { value: (i * segmentHeight * -1).toString(), x: w => -w - 10, y: () => y, style }
        layer.createText(text)
      }
    }

    const segmentWidth = maxX / xSegmentCount
    for (let i = 1; i <= xSegmentCount; i++) {
      const item = this.data[parseInt((i * segmentWidth).toString())]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item)
      const text = {
        value: xValue.toString(),
        x: w => Math.abs(i * segmentWidth) * ratio.x - (w / 2),
        y: () => offsetY * ratio.y - 20,
        style
      }
      layer.createText(text)
    }

    return this
  }

  onMoveHandler (p: Point): boolean {
    const layer = this.chart.actionLayer
    if (!this.testLayer.hitTest(p)) return false
    const { ratio, absMinY, offsetY } = this
    const minY = this.constraints.minY
    const padding = this.getPadding(this.testLayer)
    const index = Math.floor(((p.x - this.chart.padding.left) / this.chart.ratio.x))
    const item = this.data[index]
    if (!item) return
    const viewport = new Viewport(this.chart.size, padding)
    let value = this.getYValue(item)
    value = value < 0 ? absMinY - Math.abs(value) : value + offsetY
    const sp = point(index * ratio.x + padding.left, (layer.size.height - (padding.top)) - value * ratio.y)
    createCorner(layer, sp, { width: viewport.x, height: viewport.bottom - (minY < 0 ? absMinY : 0) })
    const { xValue, yValue } = this.getDisplayValues(item)
    const xText = this.chart.legend.xTitle + xValue
    const yText = this.chart.legend.yTitle + yValue
    createTooltipWindow(layer, sp, viewport, [xText, yText], this.options.tooltipStyle || {})
    return false
  }

  private createLayer () {
    const layer = this.chart.createLayer('bottom-left')
    this.setPadding(layer)
    layer.constraints = this.constraints
    return layer
  }

  private setPadding (layer: Layer): void {
    layer.setPadding(this.getPadding(layer))
  }

  private getPadding (layer: Layer): Padding {
    const paddingLeft = layer.measureText(this.constraints.maxY.toString(), styles.axisText).width + 20
    return padding(65, paddingLeft, 25, 30)
  }
}
