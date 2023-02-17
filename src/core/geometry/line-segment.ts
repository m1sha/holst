import { IPoint } from './point'

export type LineSegmentType = 'gap' | 'solid'

export interface ILineSegment extends IPoint {
  x: number
  y: number
  cp1x?: number
  cp1y?: number
  cp2x?: number
  cp2y?: number
  type: LineSegmentType
}
