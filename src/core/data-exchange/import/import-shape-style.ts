/* global CanvasLineCap, CanvasLineJoin */

import { ShapeStyle } from '../../styles/shape-style'
import { ShapeStyleDTO } from '../contract/shape'
import { FillStrokeOrder } from '../../styles/fill-stroke-order'
import { parseShadow } from './parse-shadow'

export function importShapeStyle (style: ShapeStyleDTO): ShapeStyle {
  return {
    fill: style.fill,
    fillStrokeOrder: style.fillStrokeOrder as FillStrokeOrder,
    lineCap: style.lineCap as CanvasLineCap,
    lineDash: style.lineDash,
    lineDashOffset: style.lineDashOffset,
    lineJoin: style.lineJoin as CanvasLineJoin,
    lineWidth: style.lineWidth,
    miterLimit: style.miterLimit,
    stroke: style.stroke,
    shadow: style.shadow ? parseShadow(style.shadow) : undefined
  }
}
