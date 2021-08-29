import { createCorner, createTooltipWindow } from '../chart/bg-templates'
import { LineChartBuilder } from '../chart/line-chart-builder'
import { Constraints } from '../core/constraints'
import { TextStyle } from '../core/label-style'
import { Layer } from '../core/layers'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { padding, point } from '../core/utils'
import { Viewport } from '../core/viewport'

export class LineChartBuilder3 extends LineChartBuilder {
  constraints: Constraints
  textStyle: TextStyle
  testLayer: Layer

  addGraphLayer (): this | LineChartBuilder3 {
    this.testLayer = this.createLayer()
    const layer = this.createLayer()
    const d = layer.ratio
    const absMinY = Math.abs(this.constraints.minY)
    const graph = layer.createShape()
    graph.style.strokeStyle = '#028f5f'
    graph.style.lineWidth = 3
    graph.style.lineJoin = 'bevel'
    const points = []
    let i = 0
    for (const item of this.data) {
      let value = (item as any).Value
      value = value < 0 ? absMinY - Math.abs(value) : value + absMinY
      points.push({ x: i++ * d.x, y: value * d.y })
    }
    graph.polyline(points)

    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const xLines = this.options.xSegmentCount || 10
    const yLines = this.options.ySegmentCount || 10
    const layer = this.createLayer()
    const d = layer.ratio
    const constraints = this.constraints
    const absMinY = Math.abs(this.constraints.minY)
    const absMaxY = Math.abs(this.constraints.maxY)
    const coordinateCross = layer.createShape()
    coordinateCross.style.strokeStyle = 'rgba(11,11,11,1)'
    coordinateCross.lineH({ x: 0, y: absMinY * d.y }, layer.size.width)
    coordinateCross.lineV({ x: 0, y: 0 }, (absMaxY + absMinY) * d.y)
    const yy = Math.abs(this.constraints.maxY) / yLines
    const dashY = layer.createShape()
    dashY.style.strokeStyle = 'rgba(228,228,228,1)'
    for (let i = 1; i <= yLines; i++) {
      const y = (Math.abs(i * yy) + absMinY) * d.y
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
    const absMinY = Math.abs(this.constraints.minY)
    const absMaxY = Math.abs(this.constraints.maxY)

    const text = { value: '0', x: () => -15, y: () => absMinY * d.y, style: this.textStyle }
    layer.createText(text)

    const yy = absMaxY / yLines
    for (let i = 1; i <= yLines; i++) {
      const y = (Math.abs(i * yy) + absMinY) * d.y
      const text = { value: (i * yy).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
      layer.createText(text)
    }

    for (let i = 1; i <= yLines; i++) {
      if (absMinY < Math.abs(i * yy)) break
      const y = (absMinY - Math.abs(i * yy)) * d.y
      const text = { value: (i * yy * -1).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
      layer.createText(text)
    }

    const xx = Math.abs(constraints.maxX) / xLines
    for (let i = 1; i <= xLines; i++) {
      const item = this.data[parseInt((i * xx).toString())]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item)
      const text = {
        value: xValue.toString(),
        x: w => Math.abs(i * xx) * d.x - (w / 2),
        y: () => Math.abs(this.constraints.minY) * d.y - 20,
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
    const padding = this.getPadding(this.testLayer)
    const index = Math.floor(((p.x - this.chart.padding.left) / this.chart.ratio.x))
    const item = this.data[index]
    if (!item) return
    const viewport = new Viewport(this.chart.size, padding)
    let value = this.getYValue(item)
    value = value < 0 ? Math.abs(this.constraints.minY) - Math.abs(value) : value + Math.abs(this.constraints.minY)
    const sp = point(index * d.x + padding.left, (layer.size.height - (padding.top)) - value * d.y)
    createCorner(layer, sp, { width: viewport.x, height: viewport.bottom - Math.abs(this.constraints.minY) })
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
