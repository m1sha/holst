import { Context2D } from './context2d'
import { EventType } from './event-type'
import { Point } from './point'

export interface Activity {
  readonly ctx: Context2D
  render()
  clear()
}

export interface EventInfo {
  event: Event | MouseEvent | KeyboardEvent
  eventType: EventType
  point?: Point
}

export class EventHandler {
  private readonly activity: Activity
  private readonly delegates: { eventType: EventType, callback: (e: EventInfo) => void }[]
  constructor (activity: Activity) {
    this.activity = activity
    this.delegates = []
    activity.ctx.on((et, e) => this.invoke(et, e as MouseEvent), 'mousemove', 'mouseleave', 'click')
  }

  addEventListener (eventType: EventType, callback: (e: EventInfo) => void) {
    this.delegates.push({ eventType, callback })
  }

  private invoke (eventType: EventType, event: Event | MouseEvent | KeyboardEvent): void {
    this.activity.clear()

    if (event instanceof MouseEvent) {
      const point = { x: event.offsetX, y: event.offsetY }
      for (const delegate of this.delegates) {
        if (delegate.eventType !== eventType) {
          continue
        }

        delegate.callback({ eventType, event, point })
      }
    }

    this.activity.render()
  }
}
