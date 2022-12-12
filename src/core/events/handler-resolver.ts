import { EventType } from './interactive'
import { Point } from '../geometry/point'
import { EventHandlers, InteractiveEvent, ListenerCallback, ListenerType } from './event-handler2'
import { ActionSpecDic } from './action-spec-dic'
import { MouseEventDecorator, KeyboardEventDecorator, DragEventDecorator } from './decorators'
import { IHTMLCanvasElement } from '../render/html-canvas-element'

export class HandlerResolver {
  private handlers: EventHandlers
  private element: IHTMLCanvasElement
  private hovered: ActionSpecDic
  private pressed: ActionSpecDic
  private dragged: ActionSpecDic
  private sceneHandlers: Record<string, ListenerCallback>

  constructor (canvas: IHTMLCanvasElement, handlers: EventHandlers, sceneHandlers?: Record<string, ListenerCallback>) {
    this.handlers = handlers
    this.element = canvas
    this.hovered = new ActionSpecDic()
    this.pressed = new ActionSpecDic()
    this.dragged = new ActionSpecDic()
    this.sceneHandlers = sceneHandlers ?? {}
  }

  onclick (e: MouseEvent) {
    callAll(this.handlers.click, 'click', e, (p, decorator) => {
      if (!this.hit(p, e)) return

      p.listener(this.createEvent(decorator, p))
    })
  }

  ondblclick (e: MouseEvent): any {
    callAll(this.handlers.dblclick, 'dblclick', e, (p, decorator) => {
      if (!this.hit(p, e)) return

      p.listener(this.createEvent(decorator, p))
    })
  }

  onmousemove (e: MouseEvent) {
    callAll(this.handlers.leave, 'leave', e, (p, decorator) => {
      if (this.hit(p, e)) return
      const id = p.interactive.id

      if (!this.hovered.has(id)) return

      this.hovered.clear(id)

      p.listener(this.createEvent(decorator, p))
    })

    callAll(this.handlers.hover, 'hover', e, (p, decorator) => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id

      if (this.hovered.isStopPropagation(id)) {
        decorator.stopPropagation()
        return
      }

      if (this.hovered.has(id)) return
      this.hovered.set(id)

      p.listener(this.createEvent(decorator, p))

      if (decorator.isStopPropagation) {
        this.hovered.setStopPropagation(id)
      }
    })

    callAll(this.handlers.mousemove, 'mousemove', e, (p, decorator) => {
      const id = p.interactive.id
      const hit = this.hit(p, e)
      const pressed = this.pressed.has(id)
      decorator.pressed = pressed
      decorator.hit = hit
      p.listener(this.createEvent(decorator, p))
    })
  }

  onmouseleave (e: MouseEvent) {
    callAll(this.handlers.leave, 'leave', e, (p, decorator) => {
      const id = p.interactive.id
      if (!this.hovered.has(id)) return
      this.hovered.clear(id)
      p.listener(this.createEvent(decorator, p))
    })

    this.pressed.clearAll()
  }

  onmouseup (e: MouseEvent) {
    callAll(this.handlers.mouseup, 'mouseup', e, (p, decorator) => {
      const id = p.interactive.id
      if (!this.pressed.has(id)) return
      this.pressed.clear(id)
      p.listener(this.createEvent(decorator, p))
    })
  }

  onmousedown (e: MouseEvent) {
    callAll(this.handlers.mousedown, 'mousedown', e, (p, decorator) => {
      if (!this.hit(p, e)) return
      const id = p.interactive.id
      if (this.pressed.has(id)) return
      this.pressed.set(id)

      p.listener(this.createEvent(decorator, p))
    })
  }

  onkeyup (e: KeyboardEvent) {
    callAll(this.handlers.keyup, 'keyup', e, (p, decorator) => {
      p.listener(this.createEvent(decorator, p))
    })
  }

  onkeydown (e: KeyboardEvent) {
    callAll(this.handlers.keydown, 'keydown', e, (p, decorator) => {
      p.listener(this.createEvent(decorator, p))
    })
  }

  onwheel (e: WheelEvent): any {
    callAll(this.handlers.wheel, 'wheel', e, (p, decorator) => {
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondragover (e: DragEvent): any {
    callAll(this.handlers.dragover, 'dragover', e, (p, decorator) => {
      e.preventDefault()
      e.dataTransfer!!.dropEffect = 'move'
      if (!this.hit(p, e)) {
        return
      }
      const id = p.interactive.id
      this.dragged.set(id)
      p.listener(this.createEvent(decorator, p))
    })

    callAll(this.handlers.dragleave, 'dragleave', e, (p, decorator) => {
      if (this.hit(p, e)) return
      const id = p.interactive.id
      if (!this.dragged.has(id)) return
      this.dragged.clear(id)

      p.listener(this.createEvent(decorator, p))
    })
  }

  ondragleave (e: DragEvent): any {
    callAll(this.handlers.dragleave, 'dragleave', e, (p, decorator) => {
      this.dragged.clearAll()
      p.listener(this.createEvent(decorator, p))
    })
  }

  ondrop (e: DragEvent): any {
    callAll(this.handlers.drop, 'drop', e, (p, decorator) => {
      if (!this.hit(p, e)) return
      p.listener(this.createEvent(decorator, p))
    })
  }

  onblur (e: FocusEvent): any {
    throw new Error('Method not implemented.' + e as string)
  }

  onfocus (e: FocusEvent): any {
    throw new Error('Method not implemented.' + e as string)
  }

  private createEvent<T> (e: T, p: ListenerType) {
    return new InteractiveEvent(e, p.interactive, this.element)
  }

  private hit (p: ListenerType, e: MouseEvent) {
    return p.interactive.inPath(new Point(e.offsetX, e.offsetY))
  }
}

function callAll (handlers: ListenerType[], name: keyof EventType, e: Event, callback: (p: ListenerType, decorator: any) => void) {
  if (!handlers) return

  const sortedHandlers = handlers.sort((a, b) => { // BADCODE revise this solution
    return b.interactive.order - a.interactive.order
  })

  // console.log(sortedHandlers.map(p => p.interactive.order).join(', '))

  const decorator = createDecorator(name, e)
  for (const handler of sortedHandlers) {
    callback(handler, decorator)
    // console.log(name + ': ' + handler.interactive.name + ' (' + handler.interactive.order + ') is stopped:' + decorator.isStopPropagation)
    if (decorator.isStopPropagation) break
  }
  // if (!decorator.isStopPropagation) {
  //   if (this.sceneHandlers[name]) this.sceneHandlers[name](this.createEvent(decorator))
  // }
}

function createDecorator (name: keyof EventType, e: Event) {
  switch (name) {
    case 'click':
    case 'dblclick':
    case 'mousedown':
    case 'mousemove':
    case 'mouseup':
    case 'hover':
    case 'leave':
    case 'wheel':
      return new MouseEventDecorator(e as MouseEvent)
    case 'keydown':
    case 'keyup':
      return new KeyboardEventDecorator(e as KeyboardEvent)
    case 'drop':
    case 'dragleave':
    case 'dragover':
      return new DragEventDecorator(e as DragEvent)
  }
  throw new Error(`Event type ${name} is unsupported`)
}
