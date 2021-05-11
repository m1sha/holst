import { EventType } from './event-type'
import { Point } from './point'

export interface Activity {
  readonly ctx: CanvasRenderingContext2D
  render()
  clear()
}

export class EventHandler {
  private readonly activity: Activity
  constructor (activity: Activity) {
    this.activity = activity
    const { canvas } = activity.ctx
    canvas.onmousemove = e => this.invoke('move', e)
    canvas.onmouseleave = e => this.invoke('leave', e)
  }

  on: (eventType: EventType, point: Point) => void

  private invoke (eventType: EventType, e: MouseEvent): void {
    const point = { x: e.offsetX, y: e.offsetY }
    this.activity.clear()
    if (this.on) this.on(eventType, point)
    this.activity.render()
  }
}
