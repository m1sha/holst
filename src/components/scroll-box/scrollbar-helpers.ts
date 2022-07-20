import { IPoint } from '../../core/point'
import { Layer } from '../../index'
import { ShapeStyle } from '../../core/shape-style'

const createArrowLeft = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow left
  .createShape(style)
  .moveTo({ x: x - 2, y: y })
  .lineTo({ x: x + 5, y: y - 5 })
  .lineTo({ x: x + 5, y: y + 5 })
  .closePath()

const createArrowRight = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow right
  .createShape(style)
  .moveTo({ x: x + 2, y: y })
  .lineTo({ x: x - 5, y: y - 5 })
  .lineTo({ x: x - 5, y: y + 5 })
  .closePath()

const createArrowUp = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow up
  .createShape(style)
  .moveTo({ x: x, y: y - 2 })
  .lineTo({ x: x + 5, y: y + 5 })
  .lineTo({ x: x - 5, y: y + 5 })
  .closePath()

const createArrowDown = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow down
  .createShape(style)
  .moveTo({ x: x, y: y + 2 })
  .lineTo({ x: x + 5, y: y - 5 })
  .lineTo({ x: x - 5, y: y - 5 })
  .closePath()

export { createArrowLeft, createArrowRight, createArrowUp, createArrowDown }
