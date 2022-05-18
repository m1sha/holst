import { Point } from './point'

export interface EventType {
  'click': MouseEvent
  'hover': Event
  'blur': Event
}

export interface Interactive {
  on<K extends keyof EventType> (type: K, listener: (ev: EventType[K]) => void): void
  off<K extends keyof EventType> (type: K): void
  inPath (p: Point): boolean
  id: string
}
