
import { Point } from '../point'
interface MoveTo {
  type: 'M' | 'm'
  point: Point
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
  point: Point
}

interface CubicBezierCurve {
  type: 'C' | 'c'
  point1: Point
  point2: Point
  point: Point
}

interface SmoothCubicBezierCurve {
  type: 'S' | 's'
  point2: Point
  point: Point
}

interface QuadraticBezierCurve {
  type: 'Q' | 'q'
  point1: Point
  point: Point
}

interface SmoothQuadraticBezierCurve {
  type: 'T' | 't'
  point: Point
}

interface Arc {
  type: 'A' | 'a'
  target: Point
  angle: number
  largeArcFlag: 0 | 1
  sweepFlag: 0 | 1
  point: Point
}

interface ClosePath {
  type: 'Z' | 'z'
}

export type SvgPathDElement = MoveTo | LineTo | HorizontalLine | VerticalLine | CubicBezierCurve | SmoothCubicBezierCurve
    | QuadraticBezierCurve | SmoothQuadraticBezierCurve | Arc | ClosePath
