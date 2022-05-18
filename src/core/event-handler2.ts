import { removeItem } from '../tools/array'
import { EventType } from './interactive'

export interface IEventHandler {
  add<K extends keyof EventType>(id: string, type: K, listener: (ev: EventType[K]) => void): void
  remove<K extends keyof EventType>(id: string, type: K): void
}

type F<K extends keyof EventType> = { type: K; listener: (ev: EventType[K]) => void }
type ListenerType = F<keyof EventType>

export class EventHandler implements IEventHandler {
  private handlers: Record<string, ListenerType[]> = {}
  private element: HTMLCanvasElement

  constructor (canvas: HTMLCanvasElement) {
    this.element = canvas
    this.init()
  }

  add<K extends keyof EventType> (id: string, type: K, listener: (ev: EventType[K]) => void): void {
    if (!this.handlers[id]) this.handlers[id] = []
    const s = { type, listener } as ListenerType
    this.handlers[id].push(s)
  }

  remove<K extends keyof EventType> (id: string, type: K): void {
    removeItem(this.handlers[id], p => p.type === type)
  }

  private init () {
    this.element.click = () => alert('')
  }
}
