/* global CanvasLineCap, CanvasLineJoin */
/* eslint no-undef: "error" */
export interface ShapeStyle {
    lineCap?: CanvasLineCap
    lineDashOffset?: number
    lineDash?: number[]
    lineJoin?: CanvasLineJoin
    lineWidth?: number
    miterLimit?: number
    fillStyle?: string | CanvasGradient | CanvasPattern
    strokeStyle?: string | CanvasGradient | CanvasPattern
}
