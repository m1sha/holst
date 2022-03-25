export interface Arc {
  type: 'Arc'
  x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
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

export interface ClosePath {
  type: 'ClosePath'
}

export interface ArcR {
  type: 'ArcR'
  radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export interface EllipseR {
  type: 'EllipseR'
  radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export interface MoveToR {
  type: 'MoveToR',
  x: number, y: number
}

export interface LineToR {
  type: 'LineToR',
  x: number, y: number
}

export interface LineHR {
  type: 'LineHR',
  w: number
}

export interface LineVR {
  type: 'LineVR',
  h: number
}

export interface RectR {
  type: 'RectR',
  w: number, h: number
}

export type Path2DElement =
  | Arc
  | ArcTo
  | BezierCurveTo
  | Ellipse
  | LineTo
  | LineHR
  | LineVR
  | MoveTo
  | QuadraticCurveTo
  | Rect
  | ClosePath
  | MoveToR
  | ArcR
  | EllipseR
  | LineToR
  | RectR
