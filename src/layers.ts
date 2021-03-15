import colors from './colors'
import { Padding } from './padding'
import { Rect } from './rect'
import { Shape } from './shape'
import sizes from './sizes'

const drawGrid = (options: {bounds: Rect, seed: {width: number, height: number}}): Shape => {
  const path = new Path2D()
  for (let i = options.seed.height; i < options.bounds.height; i += options.seed.height) {
    path.moveTo(0, i)
    path.lineTo(options.bounds.width, i)
  }
  for (let i = options.seed.width; i < options.bounds.width; i += options.seed.width) {
    path.moveTo(i, 0)
    path.lineTo(i, options.bounds.height)
  }
  return {
    path,
    style: {
      strokeStyle: colors.gridLineColor,
      lineWidth: sizes.gridLineWidth
    }
  }
}

const drawBackground = (color: string, rect: Rect): Shape => {
  const path = new Path2D()
  path.rect(rect.x, rect.y, rect.width, rect.height)
  return {
    path,
    style: {
      fillStyle: color
    }
  }
}

const drawAxis = (bounds: Rect, padding: Padding): Shape => {
  const path = new Path2D()
  // y
  path.moveTo(padding.left, padding.top)
  path.lineTo(padding.left, bounds.height - padding.bottom)
  // x
  path.moveTo(padding.left, bounds.height - padding.bottom)
  path.lineTo(bounds.width - padding.right, bounds.height - padding.bottom)
  return {
    path,
    style: {
      strokeStyle: colors.lineColor
    }
  }
}

export { drawGrid, drawBackground, drawAxis }
