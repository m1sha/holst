
import { IPoint } from '../point'
interface MoveTo {
  type: 'M' | 'm'
  point: IPoint
}

interface HorizontalLine {
  type: 'H' | 'h'
  width: number
}

interface VerticalLine {
  type: 'V' | 'v'
  height: number
}

interface LineTo {
  type: 'L' | 'l'
  point: IPoint
}

interface CubicBezierCurve {
  type: 'C' | 'c'
  point1: IPoint
  point2: IPoint
  point: IPoint
}

interface SmoothCubicBezierCurve {
  type: 'S' | 's'
  point2: IPoint
  point: IPoint
}

interface QuadraticBezierCurve {
  type: 'Q' | 'q'
  point1: IPoint
  point: IPoint
}

interface SmoothQuadraticBezierCurve {
  type: 'T' | 't'
  point: IPoint
}

interface Arc {
  type: 'A' | 'a'
  target: IPoint
  angle: number
  largeArcFlag: 0 | 1
  sweepFlag: 0 | 1
  point: IPoint
}

interface ClosePath {
  type: 'Z' | 'z'
}

export type SvgPathDElement = MoveTo | LineTo | HorizontalLine | VerticalLine | CubicBezierCurve | SmoothCubicBezierCurve
    | QuadraticBezierCurve | SmoothQuadraticBezierCurve | Arc | ClosePath
