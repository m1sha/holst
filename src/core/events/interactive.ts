import { FocusEventDecorator, KeyboardEventDecorator, MouseEventDecorator, DragEventDecorator } from './decorators'
import { Point } from '../geometry/point'
import { MouseCursorTypes } from './mouse-cursor-types'

export interface InteractiveEvent<TEvent> {
  event: TEvent
  cursor: MouseCursorTypes
  target: any
}

export interface EventType {
  'click': InteractiveEvent<MouseEventDecorator>
  'dblclick': InteractiveEvent<MouseEventDecorator>
  'hover': InteractiveEvent<MouseEventDecorator>
  'leave': InteractiveEvent<MouseEventDecorator>
  'mousemove': InteractiveEvent<MouseEventDecorator>
  'mousedown': InteractiveEvent<MouseEventDecorator>
  'mouseup': InteractiveEvent<MouseEventDecorator>
  'keyup': InteractiveEvent<KeyboardEventDecorator>
  'keydown': InteractiveEvent<KeyboardEventDecorator>
  'wheel': InteractiveEvent<MouseEventDecorator>
  'focus': InteractiveEvent<FocusEventDecorator>
  'blur': InteractiveEvent<FocusEventDecorator>
  'dragover': InteractiveEvent<DragEventDecorator>
  'dragleave': InteractiveEvent<DragEventDecorator>
  'drop': InteractiveEvent<DragEventDecorator>
}

export type EventListener = <K extends keyof EventType>(ev: EventType[K]) => void

export interface Interactive {
  on<K extends keyof EventType> (type: K, listener: EventListener): this | Interactive
  off<K extends keyof EventType> (type: K): this | Interactive
  inPath (p: Point): boolean
  id: string
  order: number
  name: string
}
