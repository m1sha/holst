import { Point } from './point'

export interface EventType {
  'click': MouseEvent
  'hover': MouseEvent
  'blur': MouseEvent
}

export interface Interactive {
  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): this | Interactive
  off<K extends keyof EventType> (type: K): this | Interactive
  inPath (p: Point): boolean
  id: string
}
