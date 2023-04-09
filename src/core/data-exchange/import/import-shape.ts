import Shape from '../../shape'
import { ShapeDTO } from '../contract/shape'
import { importShapeStyle } from './import-shape-style'
import { parseTransform } from './parse-transform'

export function importShape (dto: ShapeDTO): Shape {
  const style = importShapeStyle(dto.style)
  const result = Shape.create(style)
  result.order = dto.order
  if (dto.transform) {
    result.injectTransform(parseTransform(dto.transform))
  }
  for (const f of dto.figures ?? []) {
    switch (f.type) {
      case 'rect':
        result.rect(f)
        break
      case 'circle':
        result.circle(f.x, f.y, f.radius)
        break
      case 'roundRect':
        result.roundRect(f, f)
        break
      case 'moveTo':
        result.moveTo(f)
        break
      case 'lineTo':
        result.lineTo(f)
        break
      case 'closePath':
        if (f.close) result.closePath()
        break
      case 'arc':
        result.arc({ x: f.x, y: f.y }, f.radius, f.startAngle, f.endAngle, f.anticlockwise)
        break
      case 'ellipse':
        result.ellipse({ x: f.x, y: f.y }, f.radiusX, f.radiusY, f.rotation, f.startAngle, f.endAngle, f.anticlockwise)
        break
      case 'bezierCurveTo':
        result.bezierCurveTo({ x: f.cp1x, y: f.cp1y }, { x: f.cp2x, y: f.cp2y }, { x: f.x, y: f.y })
        break
      case 'quadraticCurveTo':
        result.quadraticCurveTo({ x: f.cpx, y: f.cpy }, { x: f.x, y: f.y })
        break
    }
  }
  return result
}
