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
  private dragged: ActionSpecDic

  constructor (handlers: EventHandlers, canvas: HTMLCanvasElement) {
    this.handlers = handlers
    this.element = canvas
    this.hovered = new ActionSpecDic()
    this.pressed = new ActionSpecDic()
    this.dragged = new ActionSpecDic()
  }

  onclick (e: MouseEvent) {
    this.setHandler('click', p => {
      if (!this.hit(p, e)) return true
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
      if (decorator.isStopPropagation) return false
      return true
    })
  }

  ondblclick (e: MouseEvent): any {
    this.setHandler('dblclick', p => {
      if (!this.hit(p, e)) return true
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
      if (decorator.isStopPropagation) return false
      return true
    })
  }

  onmousemove (e: MouseEvent) {
    this.setHandler('leave', p => {
      if (this.hit(p, e)) return true
      const id = p.interactive.id
      if (!this.hovered.has(id)) return true
      this.hovered.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
      if (decorator.isStopPropagation) return false
      return true
    })

    this.setHandler('hover', p => {
      if (!this.hit(p, e)) return true
      const id = p.interactive.id
      if (this.hovered.has(id)) return true
      this.hovered.set(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))
      if (decorator.isStopPropagation) return false
      return true
    })

    this.setHandler('mousemove', p => {
      const id = p.interactive.id
      const hit = this.hit(p, e)
      const pressed = this.pressed.has(id)
      const decorator = new MouseEventDecorator(e, pressed, hit)
      p.listener(this.createEvent(decorator, p))
      if (decorator.isStopPropagation) return false
      return true
    })
  }

  onmouseleave (e: MouseEvent) {
    this.setHandler('leave', p => {
      const id = p.interactive.id
      if (!this.hovered.has(id)) return true
      this.hovered.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })

    this.pressed.clearAll()
  }

  onmouseup (e: MouseEvent) {
    this.setHandler('mouseup', p => {
      const id = p.interactive.id
      if (!this.pressed.has(id)) return true
      this.pressed.clear(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  onmousedown (e: MouseEvent) {
    this.setHandler('mousedown', p => {
      if (!this.hit(p, e)) return true
      const id = p.interactive.id
      if (this.pressed.has(id)) return true
      this.pressed.set(id)
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  onkeyup (e: KeyboardEvent) {
    this.setHandler('keyup', p => {
      const decorator = new KeyboardEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  onkeydown (e: KeyboardEvent) {
    this.setHandler('keydown', p => {
      const decorator = new KeyboardEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  onwheel (e: WheelEvent): any {
    this.setHandler('wheel', p => {
      const decorator = new MouseEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  ondragover (e: DragEvent): any {
    this.setHandler('dragover', p => {
      e.preventDefault()
      e.dataTransfer!!.dropEffect = 'move'
      if (!this.hit(p, e)) {
        return true
      }
      const id = p.interactive.id
      this.dragged.set(id)
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })

    this.setHandler('dragleave', p => {
      if (this.hit(p, e)) return true
      const id = p.interactive.id
      if (!this.dragged.has(id)) return true
      this.dragged.clear(id)
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  ondragleave (e: DragEvent): any {
    this.setHandler('dragleave', p => {
      this.dragged.clearAll()
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  ondrop (e: DragEvent): any {
    this.setHandler('drop', p => {
      if (!this.hit(p, e)) return true
      const decorator = new DragEventDecorator(e)
      p.listener(this.createEvent(decorator, p))

      return true
    })
  }

  onblur (e: FocusEvent): any {
    throw new Error('Method not implemented.' + e as string)
  }

  onfocus (e: FocusEvent): any {
    throw new Error('Method not implemented.' + e as string)
  }

  private setHandler (name: keyof EventType, callback: (p: ListenerType) => boolean) {
    const handlers = this.handlers[name]
    if (!handlers) return
    for (const handler of handlers) {
      if (!callback(handler)) break
    }
  }

  private createEvent<T> (e: T, p: ListenerType) {
    return new InteractiveEvent(e, p.interactive, this.element)
  }

  private hit (p: ListenerType, e: MouseEvent) {
    return p.interactive.inPath(new Point(e.offsetX, e.offsetY))
  }
}
