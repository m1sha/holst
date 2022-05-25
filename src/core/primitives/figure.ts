import { Path2DElement } from '../path2d/types/path2d-element'
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

export function createFigure (stack: Path2DElement[]): Figure {
  return {
    circle: [],
    quadraticCurveTo: []
  }
}

export function updateStack (stack: Path2DElement[], f: Figure): void {
  //
}
