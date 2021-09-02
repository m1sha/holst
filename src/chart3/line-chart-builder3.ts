import { createCorner } from '../chart/bg-templates'
import { LineChartBuilder } from '../chart/line-chart-builder'
import { AnimationController } from '../core/animation'
import { Constraints } from '../core/constraints'
import { TextStyle } from '../core/label-style'
import { Layer } from '../core/layers'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { padding, point } from '../core/utils'
import { Viewport } from '../core/viewport'
import { createTooltipWindow } from '../tooltip'

export class LineChartBuilder3 extends LineChartBuilder {
  constraints: Constraints
  textStyle: TextStyle
  testLayer: Layer

  addGraphLayer (): this | LineChartBuilder3 {
    this.testLayer = this.createLayer()
    const layer = this.createLayer()
    const d = layer.ratio
    const minY = this.constraints.minY
    const absMinY = Math.abs(minY)

    const controller = new AnimationController(this.chart)
    controller.maxFrames = 960
    controller.infinityLoop = false
    controller.onFrameChange(num => {
      layer.clear()
      const graph = layer.createShape()
      graph.style.strokeStyle = '#028f5f'
      graph.style.lineWidth = 3
      graph.style.lineJoin = 'bevel'
      const points = []
      let i = 0
      const len = controller.maxFrames / this.data.length
      for (const item of this.data) {
        if (num < len * i) break
        let y = this.getYValue(item)
        y = y < 0 ? absMinY - Math.abs(y) : y + (minY < 0 ? absMinY : 0)
        points.push({ x: i++ * d.x, y: y * d.y })
      }
      graph.polyline(points)
    })

    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const xLines = this.options.xSegmentCount || 10
    const yLines = this.options.ySegmentCount || 10
    const layer = this.createLayer()
    const d = layer.ratio
    const constraints = this.constraints
    const minY = this.constraints.minY
    const absMinY = Math.abs(minY)
    const absMaxY = Math.abs(this.constraints.maxY)
    const coordinateCross = layer.createShape()
    coordinateCross.style.strokeStyle = 'rgba(11,11,11,1)'
    coordinateCross.lineH({ x: 0, y: (minY < 0 ? absMinY : 0) * d.y }, layer.size.width)
    coordinateCross.lineV({ x: 0, y: 0 }, (absMaxY + (minY < 0 ? absMinY : 0)) * d.y)
    const yy = Math.abs(this.constraints.maxY) / yLines
    const dashY = layer.createShape()
    dashY.style.strokeStyle = 'rgba(228,228,228,1)'
    for (let i = 1; i <= yLines; i++) {
      const y = (Math.abs(i * yy) + (minY < 0 ? absMinY : 0)) * d.y
      dashY.lineH(point(-5, y), layer.size.width + 5)
    }
    for (let i = 1; i <= yLines; i++) {
      if (absMinY < Math.abs(i * yy)) break
      const y = (absMinY - Math.abs(i * yy)) * d.y
      dashY.lineH(point(-5, y), layer.size.width)
    }

    const xx = Math.abs(constraints.maxX) / xLines
    for (let i = 1; i <= xLines; i++) {
      const x = Math.abs(i * xx) * d.x
      dashY.lineV(point(x, 0), layer.size.height)
    }
    return this
  }

  addNumbers (): this | LineChartBuilder {
    const xLines = this.options.xSegmentCount || 10
    const yLines = this.options.ySegmentCount || 10
    const layer = this.createLayer()
    const d = layer.ratio
    const constraints = this.constraints
    const minY = this.constraints.minY
    const absMinY = Math.abs(minY)
    const absMaxY = Math.abs(this.constraints.maxY)

    const text = { value: '0', x: () => -15, y: () => (minY < 0 ? absMinY : 0) * d.y, style: this.textStyle }
    layer.createText(text)

    const yy = absMaxY / yLines
    for (let i = 1; i <= yLines; i++) {
      const y = (Math.abs(i * yy) + (minY < 0 ? absMinY : 0)) * d.y
      const text = { value: (i * yy).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
      layer.createText(text)
    }

    if (this.constraints.minY < 0) {
      for (let i = 1; i <= yLines; i++) {
        if (absMinY < Math.abs(i * yy)) break
        const y = (absMinY - Math.abs(i * yy)) * d.y
        const text = { value: (i * yy * -1).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
        layer.createText(text)
      }
    }

    const xx = Math.abs(constraints.maxX) / xLines
    for (let i = 1; i <= xLines; i++) {
      const item = this.data[parseInt((i * xx).toString())]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item)
      const text = {
        value: xValue.toString(),
        x: w => Math.abs(i * xx) * d.x - (w / 2),
        y: () => (minY < 0 ? absMinY : 0) * d.y - 20,
        style: this.textStyle
      }
      layer.createText(text)
    }

    return this
  }

  onMoveHandler (p: Point): boolean {
    const layer = this.chart.actionLayer
    if (!this.testLayer.hitTest(p)) return false
    const d = this.testLayer.ratio
    const minY = this.constraints.minY
    const absMinY = Math.abs(minY)
    const padding = this.getPadding(this.testLayer)
    const index = Math.floor(((p.x - this.chart.padding.left) / this.chart.ratio.x))
    const item = this.data[index]
    if (!item) return
    const viewport = new Viewport(this.chart.size, padding)
    let value = this.getYValue(item)
    value = value < 0 ? absMinY - Math.abs(value) : value + (minY < 0 ? absMinY : 0)
    const sp = point(index * d.x + padding.left, (layer.size.height - (padding.top)) - value * d.y)
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
    const paddingLeft = layer.measureText(this.constraints.maxY.toString(), this.textStyle).width + 20
    return padding(65, paddingLeft, 25, 30)
  }
}
