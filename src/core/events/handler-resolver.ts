import { Point } from '../point'
import { EventHandlers, InteractiveEvent, ListenerType } from './event-handler2'

export class HandlerResolver {
  private handlers: EventHandlers
  private element: HTMLCanvasElement
  private hovered: Record<string, boolean> = {}

  constructor (handlers: EventHandlers, canvas: HTMLCanvasElement) {
    this.handlers = handlers
    this.element = canvas
  }

  onclick (e: MouseEvent) {
    this.handlers.click?.forEach(p => {
      if (!this.hit(p, e)) return
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })
  }

  onmousemove (e: MouseEvent) {
    this.handlers.leave?.forEach(p => {
      if (this.hit(p, e)) return
      if (!this.hovered[p.interactive.id]) return
      delete this.hovered[p.interactive.id]
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })

    this.handlers.hover?.forEach(p => {
      if (!this.hit(p, e)) return
      if (this.hovered[p.interactive.id]) return
      this.hovered[p.interactive.id] = true
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })
  }

  onmouseleave (e: MouseEvent) {
    this.handlers.leave?.forEach(p => {
      if (!this.hovered[p.interactive.id]) return
      delete this.hovered[p.interactive.id]
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })
  }

  onmouseup (e: MouseEvent) {
    this.handlers.mouseup?.forEach(p => {
      if (!this.hit(p, e)) return
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })
  }

  onmousedown (e: MouseEvent) {
    this.handlers.mousedown?.forEach(p => {
      if (!this.hit(p, e)) return
      p.listener(new InteractiveEvent(e, p.interactive, this.element))
    })
  }

  private hit (p: ListenerType, e: MouseEvent) {
    return p.interactive.inPath(new Point(e.offsetX, e.offsetY))
  }
}
