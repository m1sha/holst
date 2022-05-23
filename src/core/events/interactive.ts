import { FocusEventDecorator, KeyboardEventDecorator, MouseEventDecorator } from './decorators'
import { Point } from '../point'

export interface InteractiveEvent<TEvent> {
  event: TEvent
  cursor: string
  target: any
  pressed: boolean
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
}

export interface Interactive {
  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | Interactive
  off<K extends keyof EventType> (type: K): this | Interactive
  inPath (p: Point): boolean
  id: string
}
