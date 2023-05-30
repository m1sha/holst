import { Rect } from './geometry/rect'
import { Anchor } from './anchor'
import { EventType, Interactive } from './events/interactive'
import Orderable from './orderable'
import { uid } from '../utils/uid'
import { Point } from './geometry/point'
import { EventHandlerBag, IEventHandler } from './events/event-handler2'
import { Transformable } from './transformable'

export type DrawableType = 'shape' | 'text' | 'raster' | 'sprite' | 'group'
export abstract class Drawable extends Transformable implements Interactive, Orderable {
  #modified: boolean
  #anchor: Anchor | null = null
  readonly id: string
  readonly type: DrawableType
  hidden: boolean
  onModified: (() => void) | null
  name: string
  frozen: boolean = false
  order: number
  /** @internal */ eventHandler: IEventHandler = new EventHandlerBag()

  constructor (order: number) {
    super()
    this.id = uid()
    this.type = this.getType()
    this.hidden = false
    this.#modified = true
    this.onModified = null
    this.name = this.type + ' ' + order
    this.order = order
  }

  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | Drawable {
    this.eventHandler.add(this, type, listener)
    return this
  }

  off<K extends keyof EventType> (type: K): this | Drawable {
    this.eventHandler.remove(this, type)
    return this
  }

  abstract getType (): DrawableType
  abstract get bounds (): Rect
  abstract get originalBounds (): Rect
  abstract inPath(p: Point): boolean
  abstract clone (): Drawable | this

  setAnchor (anchor: Anchor) {
    this.#anchor = anchor
    anchor.addChild(this as unknown as Drawable)
  }

  clearContainer () {
    if (this.#anchor) this.#anchor.container = null
  }

  get anchor () {
    return this.#anchor
  }

  get modified (): boolean {
    return this.#modified
  }

  set modified (value: boolean) {
    this.#modified = value
    if (value && this.onModified) this.onModified()
  }

  /** @internal */
  update (): void {
    this.#modified = true
  }
}
