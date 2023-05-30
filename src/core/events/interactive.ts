import { FocusEventDecorator, KeyboardEventDecorator, MouseEventDecorator, DragEventDecorator } from './decorators'
import { Point } from '../geometry/point'
import { MouseCursorTypes } from './mouse-cursor-types'

export interface InteractiveEvent<TEvent> {
  event: TEvent
  cursor: MouseCursorTypes
  target: any
}

export type IMouseEvent = InteractiveEvent<MouseEventDecorator>
export type IKeyboardEvent = InteractiveEvent<KeyboardEventDecorator>
export type IFocusEvent = InteractiveEvent<FocusEventDecorator>
export type IDragEvent = InteractiveEvent<DragEventDecorator>

export interface EventType {
  'click': IMouseEvent
  'dblclick': IMouseEvent
  'hover': IMouseEvent
  'leave': IMouseEvent
  'mousemove': IMouseEvent
  'mousedown': IMouseEvent
  'mouseup': IMouseEvent
  'keyup': IKeyboardEvent
  'keydown': IKeyboardEvent
  'wheel': IMouseEvent
  'focus': IFocusEvent
  'blur': IFocusEvent
  'dragover': IDragEvent
  'dragleave': IDragEvent
  'drop': IDragEvent
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
