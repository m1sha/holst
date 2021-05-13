import { createAxis, createBackground, createCorner, createGrid, createThresholds, createTooltipWindow } from './bg-templates'
import { ChartBuilder } from './chart-builder'
import { ChartOptions } from './chart-options'
import colors from './colors'
import { LabelStyle } from '../core/label-style'
import { Point } from '../core/point'
import { Viewport } from '../core/viewport'

export class LineChartBuilder extends ChartBuilder {
  constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
    super(canvas, data, options)
    this.chart.addEventListener('move', e => this.onMove(e))
  }

  addBgLayer (): this | LineChartBuilder {
    const layer = this.chart.createLayer()
    layer.addShape(createBackground(colors.backgroundColor, this.chart.bounds))
    const name = this.chart.legend.chartName
    const width = this.chart.bounds.width / 2
    const height = this.chart.bounds.height - 16
    const style = { strokeStyle: '#333', fontSize: '12pt' } as LabelStyle
    layer.createText({ text: name, x: _ => width - (_ / 2), y: _ => height, style })
    return this
  }

  addThresholdLayer () : this | LineChartBuilder {
    if (!this.options.thresholds) return this
    const thresholdLayer = this.chart.createLayer()
    const thresholds = []
    const orientation = this.options.thresholdOrientation
    if (!orientation) throw new Error('thresholdOrientation is not defined')
    for (const item of this.options.thresholds) {
      let value = null
      if (orientation === 'y') {
        value = this.chart.getPoint(0, item.value).y
      }
      if (orientation === 'x') {
        value = this.chart.getPoint(item.value, 0).x
      }
      if (value === null) throw new Error('check thresholds orientation')
      thresholds.push({ value, color: item.color })
    }
    createThresholds(thresholdLayer, orientation, thresholds, this.chart.bounds, this.chart.padding)
    return this
  }

  addGridLayer (): this | LineChartBuilder {
    const point = this.chart.delta
    const layer = this.chart.createLayer()
    layer.addShape(createGrid({ bounds: this.viewport, seed: { width: point.x, height: point.y * 10 } }))
    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const layer = this.chart.createLayer()
    layer.addShape(createAxis(this.viewport /* this.chart.bounds, this.chart.padding */))
    return this
  }

  addNumbers (): this | LineChartBuilder {
    const layer = this.chart.createLayer()
    const style: LabelStyle = { color: colors.lineColor }
    const shape = layer.createShape()
    shape.style.strokeStyle = colors.lineColor
    const x0 = this.viewport.x - 28
    const y0 = this.viewport.bottom + 8
    layer.createText({ text: '0', x: _ => x0, y: _ => y0, style })
    const n = this.options.xSegmentCount || 10
    const dy = this.chart.maxHeight / n
    for (let i = 1; i <= n; i++) {
      layer.createText({
        text: (dy * i).toFixed(0),
        x: _ => x0,
        y: _ => this.chart.getPoint(0, dy * i).y,
        style
      })
      shape.lineH({ x: this.viewport.x - 5, y: this.chart.getPoint(0, dy * i).y }, 5)
    }
    const dx = Math.floor(this.chart.maxWidth / n)
    for (let i = 1; i <= n + 1; i++) {
      const item = this.data[dx * i]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item)
      layer.createText({
        text: xValue.toString(),
        x: width => this.chart.getPoint(dx * i, 0).x - (width / 2),
        y: _ => this.viewport.bottom + 26,
        style
      })
      shape.lineV({ x: this.chart.getPoint(dx * i, 0).x, y: this.viewport.bottom }, 5)
    }
    return this
  }

  addGraphLayer (): this | LineChartBuilder {
    const shape = this.chart.createLayer().createShape()
    shape.style.strokeStyle = this.options.chartStyle?.colors?.graphColor || colors.graphColor
    shape.style.lineWidth = this.options.chartStyle?.graphLineWidth || 2
    let i = 0
    for (const item of this.data) {
      const p = this.chart.getPoint(i++, this.getYValue(item))
      if (this.options.onDraw && this.options.onDraw(this.chart) === false) {
        continue
      }
      shape.lineTo(p)
      shape.moveTo(p)
    }
    return this
  }

  onMove (e: Point) {
    const viewport = new Viewport(this.chart.bounds, this.chart.padding)
    if (!viewport.hitTest(e)) {
      return
    }
    if (this.options.onDraw && this.options.onMove(this.chart, e) === false) {
      return
    }
    const layer = this.chart.actionLayer
    const index = Math.floor(((e.x - this.chart.padding.left) / this.chart.delta.x))
    const item = this.data[index]
    if (!item) return
    const point = this.chart.getPoint(index, this.getYValue(item))
    createCorner(layer, point, { width: viewport.x, height: viewport.bottom })
    const { xValue, yValue } = this.getDisplayValues(item)
    const xText = this.chart.legend.xTitle + xValue
    const yText = this.chart.legend.yTitle + yValue
    createTooltipWindow(layer, point, viewport, [xText, yText], this.options.tooltipStyle || {})
  }
}
