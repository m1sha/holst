import { createThresholds } from './bg-templates'
import { ChartBuilder } from './chart-builder'
import { ChartOptions } from './chart-options'
import { EventHandler, EventInfo } from '../core/event-handler'

export class LineChartBuilder extends ChartBuilder {
  protected eventHandler: EventHandler
  constructor (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
    super(canvas, data, options)
    this.eventHandler = new EventHandler(this.chart, this.render)
    this.eventHandler.addEventListener('mousemove', e => this.onMove(e, options))
    this.eventHandler.addEventListener('mouseleave', e => this.onMouseLeave(options))
  }

  addBgLayer (): this | LineChartBuilder {
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
    createThresholds(thresholdLayer, orientation, thresholds, { x: 0, y: 0, width: this.chart.size.width, height: this.chart.size.height }, this.chart.padding)
    return this
  }

  addGridLayer (): this | LineChartBuilder {
    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    return this
  }

  addNumbers (): this | LineChartBuilder {
    return this
  }

  addGraphLayer (): this | LineChartBuilder {
    return this
  }

  onMove (e: EventInfo, options: ChartOptions): void {
    if (this.options.onMoveRaw) {
      this.options.onMoveRaw(this.chart, e.point)
    }
  }

  onMouseLeave (options: ChartOptions) {
    if (options?.legend?.tooltip?.onHide) {
      options.legend.tooltip.onHide()
    }
  }
}
