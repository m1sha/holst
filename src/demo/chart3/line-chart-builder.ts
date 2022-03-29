import { ChartBuilder } from './chart-builder'
import { ChartOptions } from './chart-options'
import { EventHandler, EventInfo } from '../../core/event-handler'

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
    if (this.options.onMoveRaw && e.point) {
      this.options.onMoveRaw(this.chart, e.point)
    }
  }

  onMouseLeave (options: ChartOptions) {
    if (options?.legend?.tooltip?.onHide) {
      options.legend.tooltip.onHide()
    }
  }
}
