import { removeItem } from '../../tools/array'
import { EventType, Interactive } from './interactive'
import { HandlerResolver } from './handler-resolver'

export interface IEventHandler {
  type: 'bag' | 'common'
  add<K extends keyof EventType>(interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void
  remove<K extends keyof EventType>(interactive: Interactive, type: K): void
}

type F<K extends keyof EventType> = { interactive: Interactive; listener: (ev: EventType[K]) => void }
export type ListenerType = F<keyof EventType>
export type EventHandlers = Record<string, ListenerType[]>
export class EventHandlerBag implements IEventHandler {
  type: 'bag' | 'common' = 'bag'
  /** @internal */ handlers: EventHandlers = {}

  add<K extends keyof EventType> (interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void {
    if (!this.handlers[type]) this.handlers[type] = []
    const s = { interactive, listener } as ListenerType
    this.handlers[type].push(s)
  }

  remove<K extends keyof EventType> (interactive: Interactive, type: K): void {
    removeItem(this.handlers[type], p => p.interactive.id === interactive.id)
  }
}

export class EventHandler implements IEventHandler {
  type: 'bag' | 'common' = 'common'
  private handlers: EventHandlers
  private element: HTMLCanvasElement

  constructor (canvas: HTMLCanvasElement) {
    this.element = canvas
    this.handlers = {}
    this.init()
  }

  add<K extends keyof EventType> (interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void {
    if (!this.handlers[type]) this.handlers[type] = []
    const s = { interactive, listener } as ListenerType
    this.handlers[type].push(s)
  }

  remove<K extends keyof EventType> (interactive: Interactive, type: K): void {
    removeItem(this.handlers[type], p => p.interactive.id === interactive.id)
  }

  fromBag (eventHandler: IEventHandler) {
    const handlers = (eventHandler as EventHandlerBag).handlers
    const keys = Object.keys(handlers)
    for (const key of keys) {
      const incomingList = handlers[key]
      if (!this.handlers[key]) {
        this.handlers[key] = incomingList
      }
      const origin = this.handlers[key]
      for (const i of incomingList) {
        if (origin.findIndex(p => p.interactive.id === i.interactive.id) > -1) continue
        origin.push(i)
      }
    }
  }

  private init () {
    const resolver = new HandlerResolver(this.handlers, this.element)
    this.element.onmouseleave = e => resolver.onmouseleave(e)
    this.element.onclick = e => resolver.onclick(e)
    this.element.onmousemove = e => resolver.onmousemove(e)
    this.element.onmouseup = e => resolver.onmouseup(e)
    this.element.onmousedown = e => resolver.onmousedown(e)
  }
}

export class InteractiveEvent<TEvent> {
  private canvas: HTMLCanvasElement
  event: TEvent
  target: Interactive

  constructor (event: TEvent, target: Interactive, canvas: HTMLCanvasElement) {
    this.event = event
    this.target = target
    this.canvas = canvas
  }

  get cursor (): string {
    return this.canvas.style.cursor
  }

  set cursor (value: string) {
    this.canvas.style.cursor = value
  }
}
