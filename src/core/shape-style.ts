/* global CanvasLineCap, CanvasLineJoin */

import { Color } from './color'

/* eslint no-undef: "error" */
export interface ShapeStyle {
    lineCap?: CanvasLineCap
    lineDashOffset?: number
    lineDash?: number[]
    lineJoin?: CanvasLineJoin
    lineWidth?: number
    miterLimit?: number
    fillStyle?: string | CanvasGradient | CanvasPattern | Color
    strokeStyle?: string | CanvasGradient | CanvasPattern | Color
}
