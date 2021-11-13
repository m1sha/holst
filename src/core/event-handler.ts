import { Renderer2D } from './context2d'
import { EventType } from './event-type'
import { Point } from './point'
import { Scene } from './scene'

export interface Activity {
  render()
  clear()
}

export interface EventInfo {
  event: Event | MouseEvent | KeyboardEvent
  eventType: EventType
  point?: Point
}

export class EventHandler {
  private readonly scene: Scene
  private readonly render: Renderer2D
  private readonly delegates: { eventType: EventType, callback: (e: EventInfo) => void }[]
  constructor (scene: Scene, render: Renderer2D) {
    this.scene = scene
    this.render = render
    this.delegates = []
    render.on((et, e) => this.invoke(et, e as MouseEvent), 'mousemove', 'mouseleave', 'click', 'mouseup', 'mousedown')
  }

  addEventListener (eventType: EventType, callback: (e: EventInfo) => void) {
    this.delegates.push({ eventType, callback })
  }

  private invoke (eventType: EventType, event: Event | MouseEvent | KeyboardEvent): void {
    this.scene.clearActiveLayer()
    this.render.clear()

    if (event instanceof MouseEvent) {
      const point = { x: event.offsetX, y: event.offsetY }
      for (const delegate of this.delegates) {
        if (delegate.eventType !== eventType) {
          continue
        }

        delegate.callback({ eventType, event, point })
      }
    }

    this.render.render(this.scene)
  }
}
