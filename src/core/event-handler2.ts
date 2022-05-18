import { Point } from './point'
import { removeItem } from '../tools/array'
import { EventType, Interactive } from './interactive'

export interface IEventHandler {
  type: 'bag' | 'common'
  add<K extends keyof EventType>(interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void
  remove<K extends keyof EventType>(interactive: Interactive, type: K): void
}

type F<K extends keyof EventType> = { interactive: Interactive; listener: (ev: EventType[K]) => void }
type ListenerType = F<keyof EventType>

export class EventHandlerBag implements IEventHandler {
  type: 'bag' | 'common' = 'bag'
  /** @internal */ handlers: Record<string, ListenerType[]> = {}

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
  private handlers: Record<string, ListenerType[]>
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
    this.element.onclick = e => this.handlers.click?.forEach(p => {
      const inPath = p.interactive.inPath(new Point(e.clientX, e.clientY))
      if (inPath) p.listener(e)
    })

    const hovered: Record<string, boolean> = {}
    this.element.onmousemove = e => {
      this.handlers.blur?.forEach(p => {
        const inPath = p.interactive.inPath(new Point(e.clientX, e.clientY))
        if (inPath) return
        if (!hovered[p.interactive.id]) return
        delete hovered[p.interactive.id]
        p.listener(e)
      })
      this.handlers.hover?.forEach(p => {
        const inPath = p.interactive.inPath(new Point(e.clientX, e.clientY))
        if (!inPath) return
        if (hovered[p.interactive.id]) return
        hovered[p.interactive.id] = true
        p.listener(e)
      })
    }
  }
}
