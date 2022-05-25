import { IPoint } from '../point'

type Circle = {
  p: IPoint
  r: number
}

type QuadraticCurveTo = {
  cp: IPoint
  p: IPoint
}

export interface Figure {
  circle: Circle[]
  quadraticCurveTo: QuadraticCurveTo[]
}

export function createFigure (): Figure {
  return {
    circle: [],
    quadraticCurveTo: []
  }
}
