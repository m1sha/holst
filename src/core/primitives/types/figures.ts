import { IPoint } from '../../point'

export type Circle = {
  type: 'Circle'
  p: IPoint
  r: number
  index: number
}

export type QuadraticCurveTo = {
  type: 'QuadraticCurveTo'
  cp: IPoint
  p: IPoint
  index: number
}

export type Figures = QuadraticCurveTo | Circle

export interface Figure {
  map: Record<number, Figures>
  circle: Circle[]
  quadraticCurveTo: QuadraticCurveTo[]
}
