import { ShadowDTO } from './shadow'

export interface ShapeStyleDTO {
  lineCap?: string
  lineDashOffset?: number
  lineDash?: number[]
  lineJoin?: string
  lineWidth?: number
  miterLimit?: number
  fill?: string
  stroke?: string
  fillStrokeOrder?: string
  shadow?: ShadowDTO
}

type RectDTO = { type: 'rect', x: number, y: number, width: number, height: number }
type RoundRectDTO = { type: 'roundRect', x: number, y: number, width: number, height: number, tl: number, tr: number, bl: number, br: number}
type CircleDTO = { type: 'circle', x: number, y: number, radius: number }
type ArcDTO = { type: 'arc', x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean }
type EllipseDTO = { type: 'ellipse', x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean }
type LineToDTO = { type: 'lineTo', x: number, y: number }
type MoveToDTO = { type: 'moveTo', x: number, y: number }
type BezierCurveToDTO = { type: 'bezierCurveTo', cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number }
type QuadraticCurveToDTO = { type: 'quadraticCurveTo', cpx: number, cpy: number, x: number, y: number }
type ClosePathDTO = { type: 'closePath', close: boolean }

export type FigureDTO =
  | RectDTO
  | RoundRectDTO
  | CircleDTO
  | ArcDTO
  | EllipseDTO
  | LineToDTO
  | MoveToDTO
  | BezierCurveToDTO
  | QuadraticCurveToDTO
  | ClosePathDTO

export interface ShapeDTO {
  type: 'shape',
  style: ShapeStyleDTO
  order: number
  anchor?: string
  figures: FigureDTO[]
  transform?: string
}
