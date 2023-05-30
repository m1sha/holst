import Shape from '../../shape'
import { AnchorDTO } from '../contract/anchor'
import { DrawableDTO } from '../contract/drawable'
import { FigureDTO } from '../contract/shape'
import { exportAnchor } from './export-anchor'
import { exportShapeStyle } from './export-shape-style'
import { exportTransform } from './export-transform'

export function exportShape (shape: Shape, anchors: AnchorDTO[]): DrawableDTO {
  const figures = exportFigures(shape)
  const result: DrawableDTO = {
    type: 'shape',
    id: shape.id,
    name: shape.name,
    anchor: shape.anchor ? exportAnchor(shape.anchor, anchors) : undefined,
    figures,
    order: shape.order,
    style: exportShapeStyle(shape.style),
    transform: exportTransform(shape.getTransform()) || undefined
  }
  return result
}

function exportFigures (shape: Shape) {
  const figures: FigureDTO[] = []
  for (let i = 0; i < shape.figures.count; i++) {
    const fig = shape.figures.get(i)

    if (fig.type === 'Rect') {
      figures.push({ type: 'rect', x: fig.x, y: fig.y, width: fig.width, height: fig.height })
    }

    if (fig.type === 'RoundRect') {
      figures.push({
        type: 'roundRect',
        x: fig.x,
        y: fig.y,
        width: fig.width,
        height: fig.height,
        bl: fig.bl,
        br: fig.br,
        tl: fig.tl,
        tr: fig.tr
      })
    }

    if (fig.type === 'Circle') {
      figures.push({ type: 'circle', x: fig.x, y: fig.y, radius: fig.radius })
    }

    if (fig.type === 'Arc') {
      figures.push({
        type: 'arc',
        x: fig.x,
        y: fig.y,
        radius: fig.radius,
        startAngle: fig.startAngle,
        endAngle: fig.endAngle,
        anticlockwise: fig.counterclockwise
      })
    }

    if (fig.type === 'Ellipse') {
      figures.push({
        type: 'ellipse',
        x: fig.x,
        y: fig.y,
        radiusX: fig.radiusX,
        radiusY: fig.radiusY,
        rotation: fig.rotation,
        startAngle: fig.startAngle,
        endAngle: fig.endAngle,
        anticlockwise: fig.counterclockwise
      })
    }

    if (fig.type === 'MoveTo') {
      figures.push({
        type: 'moveTo',
        x: fig.x,
        y: fig.y
      })
    }

    if (fig.type === 'LineTo') {
      figures.push({
        type: 'lineTo',
        x: fig.x,
        y: fig.y
      })
    }

    if (fig.type === 'ClosePath') {
      figures.push({
        type: 'closePath',
        close: true
      })
    }
  }

  return figures
}
