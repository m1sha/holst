export interface Arc {
  type: 'Arc'
  x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export interface Circle {
  type: 'Circle'
  x: number, y: number, radius: number
}

export interface ArcTo {
  type: 'ArcTo'
  x1: number, y1: number, x2: number, y2: number, radius: number
}

export interface BezierCurveTo {
  type: 'BezierCurveTo'
  cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number
}

export interface Ellipse {
  type: 'Ellipse'
  x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export interface LineTo {
  type: 'LineTo',
  x: number, y: number
}

export interface MoveTo {
  type: 'MoveTo',
  x: number, y: number
}

export interface QuadraticCurveTo {
  type: 'QuadraticCurveTo',
  cpx: number, cpy: number, x: number, y: number
}

export interface Rect {
  type: 'Rect',
  x: number, y: number, w: number, h: number
}

export interface RoundRect {
  type: 'RoundRect',
  x: number, y: number, w: number, h: number, tl: number, tr: number, bl: number, br: number
}

export interface Arrow {
  type: 'Arrow'
  spx: number, spy: number, epx: number, epy: number, length: number, direction: '>' | '<'
}

export interface ClosePath {
  type: 'ClosePath'
}

export type Path2DElement =
  | Arc
  | ArcTo
  | Circle
  | BezierCurveTo
  | Ellipse
  | LineTo
  | MoveTo
  | QuadraticCurveTo
  | Rect
  | RoundRect
  | Arrow
  | ClosePath
