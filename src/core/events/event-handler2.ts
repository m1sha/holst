import { removeItem } from '../../utils/array'
import { EventType, Interactive } from './interactive'
import { HandlerResolver } from './handler-resolver'
import { MouseCursorTypes } from './mouse-cursor-types'
import { IHTMLCanvasElement } from '../render/html-canvas-element'

export interface IEventHandler {
  type: 'bag' | 'common'
  add<K extends keyof EventType>(interactive: Interactive, type: K, listener: (ev: EventType[K]) => void): void
  remove<K extends keyof EventType>(interactive: Interactive, type: K): void
}

type F<K extends keyof EventType> = { interactive: Interactive; listener: (ev: EventType[K]) => void }
type F2<K extends keyof EventType> = (ev: EventType[K]) => void

export type ListenerType = F<keyof EventType>
export type EventHandlers = Record<string, ListenerType[]>
export type ListenerCallback = F2<keyof EventType>
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

export class SceneEventHandler {
  handlers: Record<string, ListenerCallback> = {}

  add<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): void {
    this.handlers[type] = listener as ListenerCallback
  }

  remove<K extends keyof EventType> (type: K): void {
    delete this.handlers[type]
  }
}

export class EventHandler implements IEventHandler {
  type: 'bag' | 'common' = 'common'
  private handlers: EventHandlers
  private element: HTMLCanvasElement
  private sceneEventHandler: SceneEventHandler | null = null

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

  setSceneEventHandlers (sceneEventHandler: SceneEventHandler) {
    this.sceneEventHandler = sceneEventHandler
  }

  private init () {
    const resolver = new HandlerResolver(this.element, this.handlers, this.sceneEventHandler?.handlers)
    this.element.onclick = e => resolver.onclick(e)
    this.element.ondblclick = e => resolver.ondblclick(e)
    this.element.onmousemove = e => resolver.onmousemove(e)
    this.element.onmouseup = e => resolver.onmouseup(e)
    this.element.onmousedown = e => resolver.onmousedown(e)
    this.element.onmouseleave = e => resolver.onmouseleave(e)
    document.onkeyup = e => resolver.onkeyup(e)
    document.onkeydown = e => resolver.onkeydown(e)
    this.element.onwheel = e => resolver.onwheel(e)
    this.element.onfocus = e => resolver.onfocus(e)
    this.element.onblur = e => resolver.onblur(e)
    this.element.ondragover = e => resolver.ondragover(e)
    // this.element.ondragleave = e => resolver.ondragleave(e)
    this.element.ondrop = e => resolver.ondrop(e)
  }
}

export class InteractiveEvent<TEvent> {
  private canvas: IHTMLCanvasElement
  event: TEvent
  target: Interactive

  constructor (event: TEvent, target: Interactive, canvas: IHTMLCanvasElement) {
    this.event = event
    this.target = target
    this.canvas = canvas
  }

  get cursor (): MouseCursorTypes {
    return this.canvas.style.cursor as MouseCursorTypes
  }

  set cursor (value: MouseCursorTypes) {
    this.canvas.style.cursor = value
  }
}
