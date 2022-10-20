export type Arc = {
  type: 'Arc'
  x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export type Circle = {
  type: 'Circle'
  x: number, y: number, radius: number
}

export type SegmentedCircle = {
  type: 'SegmentedCircle'
  x: number, y: number, radius: number, segmentCount: number, smooth: number
}

export type ArcTo = {
  type: 'ArcTo'
  x1: number, y1: number, x2: number, y2: number, radius: number
}

export type BezierCurveTo = {
  type: 'BezierCurveTo'
  cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number
}

export type Ellipse = {
  type: 'Ellipse'
  x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

export type LineTo = {
  type: 'LineTo',
  x: number, y: number
}

export type MoveTo = {
  type: 'MoveTo',
  x: number, y: number
}

export type QuadraticCurveTo = {
  type: 'QuadraticCurveTo',
  cpx: number, cpy: number, x: number, y: number
}

export type Rect = {
  type: 'Rect',
  x: number, y: number, width: number, height: number
}

export type RoundRect = {
  type: 'RoundRect',
  x: number, y: number, width: number, height: number, tl: number, tr: number, bl: number, br: number
}

export type Arrow = {
  type: 'Arrow'
  spx: number, spy: number, epx: number, epy: number, length: number, direction: '>' | '<'
}

export type ClosePath = {
  type: 'ClosePath'
}

export type Path2DElement =
  | Arc
  | ArcTo
  | Circle
  | SegmentedCircle
  | BezierCurveTo
  | Ellipse
  | LineTo
  | MoveTo
  | QuadraticCurveTo
  | Rect
  | RoundRect
  | Arrow
  | ClosePath
