import { EventType } from './interactive'
import { Point } from '../point'
import { EventHandlers, InteractiveEvent, ListenerType } from './event-handler2'
import { ActionSpecDic } from './action-spec-dic'
import { MouseEventDecorator, KeyboardEventDecorator, DragEventDecorator } from './decorators'

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
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondblclick (e: MouseEvent): any {
    this.setHandler('dblclick', p => {
      if (!this.hit(p, e)) return
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onmousemove (e: MouseEvent) {
    this.setHandler('leave', p => {
      if (this.hit(p, e)) return
      const id = p.interactive.id
      if (!this.hovered.has(id)) return
      this.hovered.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })

    this.setHandler('hover', p => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id
      if (this.hovered.has(id)) return
      this.hovered.set(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })

    this.setHandler('mousemove', p => {
      const id = p.interactive.id
      const hit = this.hit(p, e)
      const pressed = this.pressed.has(id)
      const decorator = new MouseEventDecorator(e, pressed, hit)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onmouseleave (e: MouseEvent) {
    this.setHandler('leave', p => {
      const id = p.interactive.id
      if (!this.hovered.has(id)) return
      this.hovered.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })

    this.pressed.clearAll()
  }

  onmouseup (e: MouseEvent) {
    this.setHandler('mouseup', p => {
      const id = p.interactive.id
      if (!this.pressed.has(id)) return
      this.pressed.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onmousedown (e: MouseEvent) {
    this.setHandler('mousedown', p => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id
      if (this.pressed.has(id)) return
      this.pressed.set(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onkeyup (e: KeyboardEvent) {
    this.setHandler('keyup', p => {
      const decorator = new KeyboardEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onkeydown (e: KeyboardEvent) {
    this.setHandler('keydown', p => {
      const decorator = new KeyboardEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onwheel (e: WheelEvent): any {
    this.setHandler('wheel', p => {
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondragover (e: DragEvent): any {
    this.setHandler('dragover', p => {
      e.preventDefault()
      e.dataTransfer!!.dropEffect = 'move'
      if (!this.hit(p, e)) return
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondragleave (e: DragEvent): any {
    this.setHandler('dragleave', p => {
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondrop (e: DragEvent): any {
    this.setHandler('drop', p => {
      if (!this.hit(p, e)) return
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
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
