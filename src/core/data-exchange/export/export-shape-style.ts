import { ShapeStyle } from '../../styles/shape-style'
import { ShapeStyleDTO } from '../contract/shape'

export function exportShapeStyle (style: ShapeStyle): ShapeStyleDTO {
  const result: ShapeStyleDTO = {
    fill: style.fill ? (typeof style.fill === 'string' ? style.fill : style.fill.toString()) : undefined,
    stroke: style.stroke ? (typeof style.stroke === 'string' ? style.stroke : style.stroke.toString()) : undefined,
    fillStrokeOrder: style.fillStrokeOrder === 'stroke-first' ? undefined : style.fillStrokeOrder,
    lineCap: style.lineCap === 'butt' ? undefined : style.lineCap,
    lineDash: style.lineDash && style.lineDash.length ? style.lineDash : undefined,
    lineDashOffset: style.lineDashOffset || undefined,
    lineJoin: style.lineJoin === 'bevel' ? undefined : style.lineJoin,
    lineWidth: style.lineWidth === 1 ? undefined : style.lineWidth,
    miterLimit: style.miterLimit
  }
  return result
}
