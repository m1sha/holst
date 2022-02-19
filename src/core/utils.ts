import { Context2DOrientation } from './renderer2D'
import { Padding } from './padding'
import { Point } from './point'
import { Size } from './size'

const size = (width: number, height: number): Size => {
  return { width, height }
}

const padding = (top: number, left: number, bottom: number, right: number): Padding => {
  return { top, left, bottom, right }
}

const toAbsolute = (point: Point, orientation: Context2DOrientation, location: Point, originSize: Size) : Point => {
  const isTopLeft = orientation === 'top-left'
  return {
    x: location.x + point.x,
    y: isTopLeft ? point.y + location.y : (originSize.height - point.y) - location.y
  }
}

export { size, padding, toAbsolute }
