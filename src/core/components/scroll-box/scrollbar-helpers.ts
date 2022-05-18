import { IPoint } from '../../point'
import { Layer } from 'index'
import { ShapeStyle } from '../../shape-style'

const arrowLeft = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow left
  .createShape(style)
  .moveTo({ x: x - 2, y: y })
  .lineTo({ x: x + 5, y: y - 5 })
  .lineTo({ x: x + 5, y: y + 5 })
  .closePath()

const arrowRight = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow right
  .createShape(style)
  .moveTo({ x: x + 2, y: y })
  .lineTo({ x: x - 5, y: y - 5 })
  .lineTo({ x: x - 5, y: y + 5 })
  .closePath()

const arrowUp = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow up
  .createShape(style)
  .moveTo({ x: x, y: y - 2 })
  .lineTo({ x: x + 5, y: y + 5 })
  .lineTo({ x: x - 5, y: y + 5 })
  .closePath()

const arrowDown = (layer: Layer, { x, y }: IPoint, style: ShapeStyle) => layer // arrow down
  .createShape(style)
  .moveTo({ x: x, y: y + 2 })
  .lineTo({ x: x + 5, y: y - 5 })
  .lineTo({ x: x - 5, y: y - 5 })
  .closePath()

export { arrowLeft, arrowRight, arrowUp, arrowDown }
