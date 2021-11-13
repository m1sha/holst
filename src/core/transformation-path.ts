import { Path2DBase } from './path2d-base'
interface Arc {
  type: 'Arc'
  x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface ArcTo {
  type: 'ArcTo'
  x1: number, y1: number, x2: number, y2: number, radius: number
}

interface BezierCurveTo {
  type: 'BezierCurveTo'
  cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number
}

interface Ellipse {
  type: 'Ellipse'
  x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean
}

interface LineTo {
  type: 'LineTo',
  x: number, y: number
}

interface MoveTo {
  type: 'MoveTo',
  x: number, y: number
}

interface QuadraticCurveTo {
  type: 'QuadraticCurveTo',
  cpx: number, cpy: number, x: number, y: number
}

interface Rect {
  type: 'Rect',
  x: number, y: number, w: number, h: number
}

interface ClosePath {
  type: 'ClosePath'
}

type Path2DElement = Arc | ArcTo | BezierCurveTo | Ellipse | LineTo | MoveTo | QuadraticCurveTo | Rect | ClosePath

export class TransformationPath implements Path2DBase {
  addPath (path: Path2D, transform?: unknown): void {
    if (!(path instanceof TransformationPath)) throw new Error('Method unsupported.')
    if (transform) throw new Error('transform unsupported.')
    for (const item of path.queue) this.queue.push(item)
  }

  arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.queue.push({ type: 'Arc', x, y, radius, startAngle, endAngle, counterclockwise })
  }

  arcTo (x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.queue.push({ type: 'ArcTo', x1, y1, x2, y2, radius })
  }

  bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    this.queue.push({ type: 'BezierCurveTo', cp1x, cp1y, cp2x, cp2y, x, y })
  }

  ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    this.queue.push({ type: 'Ellipse', x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise })
  }

  lineTo (x: number, y: number): void {
    this.queue.push({ type: 'LineTo', x, y })
  }

  moveTo (x: number, y: number): void {
    this.queue.push({ type: 'MoveTo', x, y })
  }

  quadraticCurveTo (cpx: number, cpy: number, x: number, y: number): void {
    this.queue.push({ type: 'QuadraticCurveTo', cpx, cpy, x, y })
  }

  rect (x: number, y: number, w: number, h: number): void {
    this.queue.push({ type: 'Rect', x, y, w, h })
  }

  closePath (): void {
    this.queue.push({ type: 'ClosePath' })
  }

  queue: Path2DElement[] = []

  createPath2D (): Path2D {
    const path = new Path2D()
    for (const i of this.queue) {
      switch (i.type) {
        case 'Arc':
          path.arc(i.x, i.y, i.radius, i.startAngle, i.endAngle, i.counterclockwise)
          break
        case 'ArcTo':
          path.arcTo(i.x1, i.y1, i.x2, i.y2, i.radius)
          break
        case 'BezierCurveTo':
          path.bezierCurveTo(i.cp1x, i.cp1y, i.cp2x, i.cp2y, i.x, i.y)
          break
        case 'ClosePath':
          path.closePath()
          break
        case 'Ellipse':
          path.ellipse(i.x, i.y, i.radiusX, i.radiusY, i.rotation, i.startAngle, i.endAngle, i.counterclockwise)
          break
        case 'LineTo':
          path.lineTo(i.x, i.y)
          break
        case 'MoveTo':
          path.moveTo(i.x, i.y)
          break
        case 'QuadraticCurveTo':
          path.quadraticCurveTo(i.cpx, i.cpy, i.x, i.y)
          break
        case 'Rect':
          path.rect(i.x, i.y, i.w, i.h)
          break
      }
    }
    return path
  }
}
