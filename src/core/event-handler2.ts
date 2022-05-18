import { removeItem } from '../tools/array'
import { EventType } from './interactive'

export interface IEventHandler {
  type: 'bag' | 'common'
  add<K extends keyof EventType>(id: string, type: K, listener: (ev: EventType[K]) => void): void
  remove<K extends keyof EventType>(id: string, type: K): void
}

type F<K extends keyof EventType> = { id: string; listener: (ev: EventType[K]) => void }
type ListenerType = F<keyof EventType>

export class EventHandlerBag implements IEventHandler {
  type: 'bag' | 'common' = 'bag'
  /** @internal */ handlers: Record<string, ListenerType[]> = {}

  add<K extends keyof EventType> (id: string, type: K, listener: (ev: EventType[K]) => void): void {
    if (!this.handlers[type]) this.handlers[type] = []
    const s = { id, listener } as ListenerType
    this.handlers[type].push(s)
  }

  remove<K extends keyof EventType> (id: string, type: K): void {
    removeItem(this.handlers[type], p => p.id === id)
  }
}

export class EventHandler implements IEventHandler {
  type: 'bag' | 'common' = 'common'
  private handlers: Record<string, ListenerType[]>
  private element: HTMLCanvasElement

  constructor (canvas: HTMLCanvasElement) {
    this.element = canvas
    this.handlers = {}
    this.init()
  }

  add<K extends keyof EventType> (id: string, type: K, listener: (ev: EventType[K]) => void): void {
    if (!this.handlers[type]) this.handlers[type] = []
    const s = { id, listener } as ListenerType
    this.handlers[type].push(s)
  }

  remove<K extends keyof EventType> (id: string, type: K): void {
    removeItem(this.handlers[type], p => p.id === id)
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
        if (origin.findIndex(p => p.id === i.id) > -1) continue
        origin.push(i)
      }
    }
  }

  private init () {
    this.element.onclick = e => this.handlers.click.forEach(p => p.listener(e))
    this.element.onblur = e => this.handlers.blur.forEach(p => p.listener(e))
  }
}
