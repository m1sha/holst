import { createCorner } from './bg-templates'
import { ChartOptions } from './chart-options'
import { LineChartBuilder } from './line-chart-builder'
import { toDisplayText } from './utils'
// import { AnimationController } from '../core/animation'
import { Constraints } from '../../core/constraints'
import { Layer } from '../../core/layers'
import { Padding } from '../../core/padding'
import { Point } from '../../core/point'
import { padding } from '../../core/utils'
import { Viewport } from '../../core/viewport'
import { createTooltipWindow } from '../../tooltip'
import styles from './styles'
import { Rect } from '../../core/rect'

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
    this.xSegmentCount = this.options.xSegmentCount || 10
    this.ySegmentCount = this.options.ySegmentCount || 10
    this.constraints = constraints
    this.testLayer = this.createLayer()
    this.ratio = this.testLayer.ratio
    this.minY = this.constraints.minY
    this.absMinY = Math.abs(this.minY)
    this.offsetY = (this.minY < 0 ? this.absMinY : -this.absMinY)
    this.absMaxY = Math.abs(this.constraints.maxY)
    this.maxX = constraints.maxX
    // this.chart.createLayer().createShape({ strokeStyle: '#A31199' }).rect(rect(0, 0, canvas.width, canvas.height))
    if (options.legend?.chartName) {
      const chartName = options.legend?.chartName
      const text = { value: chartName, x: (w: number) => canvas.width / 2 - w / 2, y: (w: number) => canvas.height - 10, style: styles.chartNameText }
      this.chart.createLayer().createText(text)
    }
  }

  addGraphLayer (): this | LineChartBuilder3 {
    // const { ratio, absMinY, offsetY } = this
    // const layer = this.createLayer()
    // const controller = new AnimationController(this.chart, this.render)
    // controller.onFrameChange(num => {
    //   layer.clear()
    //   const graph = layer.createShape(styles.graphLine)
    //   const points = []
    //   let i = 0
    //   const len = controller.maxFrames / this.data.length
    //   for (const item of this.data) {
    //     if (num < len * i) break
    //     const x = i++
    //     const valueY = this.getYValue(item)
    //     const y = valueY < 0 ? absMinY - Math.abs(valueY) : valueY + offsetY
    //     points.push({ x: x * ratio.x, y: y * ratio.y })
    //   }
    //   graph.polyline(points)
    // })
    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const layer = this.createLayer()
    const { ratio, minY, absMinY, absMaxY, offsetY, maxX, ySegmentCount, xSegmentCount } = this
    const topY = (absMaxY + offsetY) * ratio.y

    const axises = layer.createShape(styles.axises)
    axises.lineH(new Point({ x: 0, y: 0 }), layer.size.width)
    axises.lineV(new Point({ x: 0, y: 0 }), topY)

    const segmentHeight = absMaxY / ySegmentCount + 1
    const segments = layer.createShape(styles.segments)
    for (let i = 1; i <= ySegmentCount; i++) {
      if (absMinY > Math.abs(i * segmentHeight) && minY > 0) continue
      const y = (Math.abs(i * segmentHeight) + offsetY) * ratio.y
      segments.lineH(new Point(-5, y), layer.size.width + 5)
    }

    if (minY < 0) {
      for (let i = 1; i <= ySegmentCount; i++) {
        if (absMinY < Math.abs(i * segmentHeight)) break
        const y = (absMinY - Math.abs(i * segmentHeight)) * ratio.y
        segments.lineH(new Point(-5, y), layer.size.width)
      }
    }

    const segmentWidth = maxX / xSegmentCount + 1
    for (let i = 1; i <= xSegmentCount; i++) {
      const x = Math.abs(i * segmentWidth) * ratio.x
      segments.lineV(new Point(x, 0), topY)
    }

    return this
  }

  addNumbers (): this | LineChartBuilder {
    const { ratio, minY, absMinY, absMaxY, offsetY, maxX, ySegmentCount, xSegmentCount } = this
    const layer = this.createLayer()
    const style = styles.axisText

    if (minY <= 0) {
      const yText = layer.createTextBlock('0', style)
      yText.target = new Point(-15, offsetY * ratio.y)
    }

    const segmentHeight = absMaxY / ySegmentCount
    for (let i = 1; i <= ySegmentCount; i++) {
      if (absMinY > Math.abs(i * segmentHeight) && minY > 0) continue
      const y = (Math.abs(i * segmentHeight) + offsetY) * ratio.y
      const value = this.options.yAxisValueFormat ? this.options.yAxisValueFormat(i * segmentHeight) : toDisplayText(i * segmentHeight)
      const yText = layer.createTextBlock(value, style)
      yText.target = new Point(-yText.width - 10, y)
    }

    if (minY < 0) {
      for (let i = 1; i <= ySegmentCount; i++) {
        if (absMinY < Math.abs(i * segmentHeight)) break
        const y = (absMinY - Math.abs(i * segmentHeight)) * ratio.y
        const value = this.options.yAxisValueFormat ? this.options.yAxisValueFormat(i * segmentHeight) : toDisplayText(i * segmentHeight * -1)
        const yText = layer.createTextBlock('-' + value, style)
        yText.target = new Point(-yText.width - 10, y)
      }
    }

    const segmentWidth = maxX / xSegmentCount
    for (let i = 1; i <= xSegmentCount; i++) {
      const item = this.data[parseInt((i * segmentWidth).toString())]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item, false)
      const xText = layer.createTextBlock(xValue.toString(), style)
      const x = Math.abs(i * segmentWidth) * ratio.x - (xText.width / 2)
      xText.target = new Point(x, -20)
    }

    return this
  }

  addThresholdLayer () : this | LineChartBuilder {
    if (!this.options.thresholds) return this
    const thresholdLayer = this.createLayer()
    const orientation = this.options.thresholdOrientation
    if (!orientation) throw new Error('thresholdOrientation is not defined')
    for (const item of this.options.thresholds) {
      if (orientation !== 'y') continue
      if (item.minValue < this.minY && item.maxValue < this.minY) continue
      // if (item.maxValue > this.absMaxY && item.maxValue > this.absMaxY) continue
      const minY = item.minValue < 0 ? this.absMinY - Math.abs(item.minValue) : item.minValue + this.offsetY
      const maxY = item.maxValue < 0 ? this.absMinY - Math.abs(item.maxValue) : item.maxValue + this.offsetY
      const currMaxY = Math.abs(item.maxValue) > this.absMaxY ? this.absMaxY + this.offsetY : Math.abs(maxY)
      const currMinY = Math.abs(item.minValue) < this.absMinY ? this.absMinY + this.offsetY : Math.abs(minY)
      const upLineY = currMaxY * this.ratio.y
      const downLineY = currMinY * this.ratio.y
      const thickness = upLineY - downLineY

      thresholdLayer.createShape({ strokeStyle: item.color, lineWidth: thickness }).lineH(new Point(0, upLineY - thickness / 2), thresholdLayer.size.width)
    }
    return this
  }

  addThresholdLimitsLayer () : this | LineChartBuilder {
    if (!this.options.thresholds) return this
    const thresholdLayer = this.createLayer()
    const orientation = this.options.thresholdOrientation
    if (!orientation) throw new Error('thresholdOrientation is not defined')
    for (const item of this.options.thresholds) {
      if (orientation !== 'y') continue
      if (item.minValue < this.minY && item.maxValue < this.minY) continue
      // if (item.maxValue > this.absMaxY && item.maxValue > this.absMaxY) continue
      const minY = item.minValue < 0 ? this.absMinY - Math.abs(item.minValue) : item.minValue + this.offsetY
      const maxY = item.maxValue < 0 ? this.absMinY - Math.abs(item.maxValue) : item.maxValue + this.offsetY
      const currMaxY = Math.abs(item.maxValue) > this.absMaxY ? this.absMaxY + this.offsetY : Math.abs(maxY)
      const currMinY = Math.abs(item.minValue) < this.absMinY ? this.absMinY + this.offsetY : Math.abs(minY)
      const upLineY = (currMaxY) * this.ratio.y
      const downLineY = (currMinY) * this.ratio.y

      const maxUpBorder = (this.absMaxY + this.offsetY) * this.ratio.y
      // console.log(`maxUpBorder = ${maxUpBorder}`)
      // console.log(`upLineY = ${upLineY}`)
      const style = { color: '#000000', fontSize: '18px', bold: true }
      if (upLineY + 20 <= maxUpBorder && item.showLimits) {
        const text = this.options.yMaxThresholdValue ? this.options.yMaxThresholdValue(item.maxValue) : item.maxValue.toString()
        const textWidth = thresholdLayer.measureText(text, style).width
        // const by = thresholdLayer.size.width / 2
        thresholdLayer
          .createShape({ strokeStyle: '#ff0000', fillStyle: '#fff', lineWidth: 2 })
          .rect(new Rect(-12 - textWidth, upLineY, textWidth + 8, 30))
        const upBorderText = thresholdLayer.createTextBlock(text, style)
        upBorderText.target = new Point(-textWidth - 8, upLineY + 10)
        thresholdLayer.createShape({ strokeStyle: '#ff0000', lineWidth: 2 }).lineH(new Point(0, upLineY), thresholdLayer.size.width)
      }

      const maxDownBorder = (this.absMinY + this.offsetY) * this.ratio.y
      if (downLineY - 20 > maxDownBorder && item.showLimits) {
        const text = this.options.yMinThresholdValue ? this.options.yMinThresholdValue(item.minValue) : item.minValue.toString()
        const textWidth = thresholdLayer.measureText(text, style).width
        // const by = thresholdLayer.size.width / 2
        thresholdLayer
          .createShape({ strokeStyle: '#ff0000', fillStyle: '#fff', lineWidth: 2 })
          .rect(new Rect(-12 - textWidth, downLineY, textWidth + 8, 30))
        const bottomBorderText = thresholdLayer.createTextBlock(text, style)
        bottomBorderText.target = new Point(-textWidth - 8, downLineY + 10)
        thresholdLayer.createShape({ strokeStyle: '#ff0000', lineWidth: 2 }).lineH(new Point(0, downLineY), thresholdLayer.size.width)
      }
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
    if (!item) return false
    const viewport = new Viewport(this.chart.size, padding)
    let value = this.getYValue(item)
    value = value < 0 ? absMinY - Math.abs(value) : value + offsetY
    const sp = new Point(index * ratio.x + padding.left, (layer.size.height - (padding.top)) - value * ratio.y)
    createCorner(layer, sp, { width: viewport.x, height: viewport.bottom - (minY < 0 ? absMinY : 0) })
    const { xValue, yValue } = this.getDisplayValues(item, true)
    const xText = this.chart.legend.xTitle + xValue.toString()
    const yText = this.chart.legend.yTitle + yValue.toString()
    createTooltipWindow(layer, sp, viewport, [xText, yText], this.options.tooltipStyle || {})
    return false
  }

  private createLayer () {
    const layer = this.chart.createLayer()
    layer.constraints = this.constraints
    this.setPadding(layer)
    return layer
  }

  private setPadding (layer: Layer): void {
    layer.setPadding(this.getPadding(layer))
  }

  private getPadding (layer: Layer): Padding {
    const { absMaxY, ySegmentCount } = this
    const segmentHeight = absMaxY / ySegmentCount
    const axisYNumbers = []
    for (let i = 1; i <= ySegmentCount; i++) {
      const textWidth = layer.measureText((toDisplayText(i * segmentHeight) + ' ').toString(), styles.axisText).width
      axisYNumbers.push(textWidth)
    }
    const maxWidth = Math.max.apply(null, axisYNumbers) + 20
    const paddingLeft = maxWidth
    return padding(65, paddingLeft, 45, 30)
  }
}
