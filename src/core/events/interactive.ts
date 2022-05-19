import { Point } from '../point'

export interface InteractiveEvent<TEvent> {
  event: TEvent
  cursor: string
  target: any
}

export interface EventType {
  'click': InteractiveEvent<MouseEvent>
  'dblclick': InteractiveEvent<MouseEvent>
  'hover': InteractiveEvent<MouseEvent>
  'leave': InteractiveEvent<MouseEvent>
  'mousedown': InteractiveEvent<MouseEvent>
  'mouseup': InteractiveEvent<MouseEvent>
}

export interface Interactive {
  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | Interactive
  off<K extends keyof EventType> (type: K): this | Interactive
  inPath (p: Point): boolean
  id: string
}
