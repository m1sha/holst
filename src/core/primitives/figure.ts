import { Path2DElement } from '../path2d/types/path2d-element'
import { Figure, QuadraticCurveTo } from './types/figures'

export function createFigure (stack: Path2DElement[]): Figure {
  const result: Figure = {
    map: {},
    circle: [],
    quadraticCurveTo: []
  }
  for (let i = 0; i < stack.length; i++) {
    const e = stack[i]
    if (e.type === 'QuadraticCurveTo') {
      const item: QuadraticCurveTo = { cp: { x: e.cpx, y: e.cpy }, p: { x: e.x, y: e.y }, index: i, type: 'QuadraticCurveTo' }
      result.map[i] = item
      result.quadraticCurveTo.push(item)
    }
  }
  return result
}

export function updateStack (stack: Path2DElement[], figure: Figure): void {
  for (let i = 0; i < stack.length; i++) {
    const item = figure.map[i]
    const e = stack[i]
    if (!item) continue
    if (item.type === 'QuadraticCurveTo' && e.type === 'QuadraticCurveTo') {
      console.dir(e)
      console.dir(item)
      e.cpx = item.cp.x
      e.cpy = item.cp.y
      e.x = item.p.x
      e.y = item.p.y
    }
  }
}
