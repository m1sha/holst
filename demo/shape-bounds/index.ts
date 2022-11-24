import { Scene, Renderer2D, ShapeStyle, Shape, Color, Rect, Drawable, Layer, ConstraintGrid } from '../../src/index'
export function createDemo (div: HTMLDivElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const grid = new ConstraintGrid(new Rect(0, 0, 800, 600), 3, 4)

  const rect = createFigure(layer)
    .rect(getRect(grid, 0, 0, 50, 50))
  addFrame(rect, layer)

  const roundRect = createFigure(layer)
    .roundRect(getRect(grid, 0, 1, 50, 50), 12)
  addFrame(roundRect, layer)

  const circle = createFigure(layer)
    .circle(getCenter(grid, 0, 2), 25)
  addFrame(circle, layer)

  const segmentedCircle = createFigure(layer)
    .segmentedCircle(getCenter(grid, 0, 3).x, getCenter(grid, 0, 3).y, 25, 6, 0.5)
  addFrame(segmentedCircle, layer)

  const moveToLineToRect = getRect(grid, 1, 0, 50, 50)
  const moveToLineTo = createFigure(layer)
    .moveTo(moveToLineToRect.topLeft).lineTo(moveToLineToRect.bottomRight)
  addFrame(moveToLineTo, layer)

  const bezierCurveToRect = getRect(grid, 1, 1, 50, 50)
  const bezierCurveTo = createFigure(layer)
    .moveTo(bezierCurveToRect.topLeft)
    .bezierCurveTo(bezierCurveToRect.topLeft, bezierCurveToRect.bottomRight.add(-25, 25), bezierCurveToRect.bottomRight)
  addFrame(bezierCurveTo, layer)

  const quadraticCurveToRect = getRect(grid, 1, 2, 50, 50)
  const quadraticCurveTo = createFigure(layer)
    .moveTo(quadraticCurveToRect.topLeft.add(-10))
    .quadraticCurveTo(quadraticCurveToRect.topLeft, quadraticCurveToRect.bottomRight.add(-25, 25))
  addFrame(quadraticCurveTo, layer)

  createView(scene, div)
}

function createFigure (layer: Layer) {
  const figureStyle: ShapeStyle = { stroke: Color.darkBlue, fill: Color.teal }
  const shape = Shape.create(figureStyle)
  layer.add(shape)
  return shape
}

function addFrame (obj: Drawable, layer: Layer) {
  const frameStyle: ShapeStyle = { stroke: Color.orange, lineDash: [3, 3], lineWidth: 2 }
  const frame = Shape.create(frameStyle).rect(obj.bounds)
  layer.add(frame)
}

function getRect (grid: ConstraintGrid, row: number, col: number, width: number, height: number) {
  return Rect.fromCenter(grid.getCell(row, col).center, width, height)
}

function getCenter (grid: ConstraintGrid, row: number, col: number) {
  return grid.getCell(row, col).center
}

function createView (scene: Scene, div: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')!
  const renderer = new Renderer2D(ctx)
  renderer.render(scene)
  div.append(canvas)
}
