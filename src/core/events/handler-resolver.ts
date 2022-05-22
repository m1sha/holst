import { EventType } from './interactive'
import { Point } from '../point'
import { EventHandlers, InteractiveEvent, ListenerType } from './event-handler2'
import { ActionSpecDic } from './action-spec-dic'

export class HandlerResolver {
  private handlers: EventHandlers
  private element: HTMLCanvasElement
  private hovered: ActionSpecDic
  private pressed: ActionSpecDic

  constructor (handlers: EventHandlers, canvas: HTMLCanvasElement) {
    this.handlers = handlers
    this.element = canvas
    this.hovered = new ActionSpecDic()
    this.pressed = new ActionSpecDic()
  }

  onclick (e: MouseEvent) {
    this.setHandler('click', p => {
      if (!this.hit(p, e)) return
      p.listener(this.createEvent(e, p))
    })
  }

  ondblclick (e: MouseEvent): any {
    this.setHandler('dblclick', p => {
      if (!this.hit(p, e)) return
      p.listener(this.createEvent(e, p))
    })
  }

  onmousemove (e: MouseEvent) {
    this.setHandler('leave', p => {
      if (this.hit(p, e)) return
      const id = p.interactive.id
      if (!this.hovered.has(id)) return
      this.hovered.clear(id)
      p.listener(this.createEvent(e, p))
    })

    this.setHandler('hover', p => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id
      if (this.hovered.has(id)) return
      this.hovered.set(id)
      p.listener(this.createEvent(e, p))
    })

    this.setHandler('mousemove', p => {
      const id = p.interactive.id
      const c = this.hit(p, e) && this.pressed.has(id)
      if (!c) return
      p.listener(this.createEvent(e, p))
    })
  }

  onmouseleave (e: MouseEvent) {
    this.setHandler('leave', p => {
      const id = p.interactive.id
      if (!this.hovered.has(id)) return
      this.hovered.clear(id)
      p.listener(this.createEvent(e, p))
    })
  }

  onmouseup (e: MouseEvent) {
    this.setHandler('mouseup', p => {
      const id = p.interactive.id
      if (!this.pressed.has(id)) return
      this.pressed.clear(id)
      p.listener(this.createEvent(e, p))
    })
  }

  onmousedown (e: MouseEvent) {
    this.setHandler('mousedown', p => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id
      if (this.pressed.has(id)) return
      this.pressed.set(id)
      p.listener(this.createEvent(e, p))
    })
  }

  onkeyup (e: KeyboardEvent) {
    this.setHandler('keyup', p => {
      p.listener(this.createEvent(e, p))
    })
  }

  onkeydown (e: KeyboardEvent) {
    this.setHandler('keydown', p => {
      p.listener(this.createEvent(e, p))
    })
  }

  onwheel (e: WheelEvent): any {
    this.setHandler('wheel', p => {
      p.listener(this.createEvent(e, p))
    })
  }

  onblur (e: FocusEvent): any {
    throw new Error('Method not implemented.')
  }

  onfocus (e: FocusEvent): any {
    throw new Error('Method not implemented.')
  }

  private setHandler (name: keyof EventType, callback: (p: ListenerType) => void) {
    const h = this.handlers[name]
    if (!h) return
    h.forEach(p => callback(p))
  }

  private createEvent<T> (e: T, p: ListenerType) {
    return new InteractiveEvent(e, p.interactive, this.element)
  }

  private hit (p: ListenerType, e: MouseEvent) {
    return p.interactive.inPath(new Point(e.offsetX, e.offsetY))
  }
}
