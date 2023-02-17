import { IPoint } from './point'

export interface IRadialSegment extends IPoint {
  x: number
  y: number
  cp1x?: number
  cp1y?: number
  cp2x?: number
  cp2y?: number
  angle: number
}
