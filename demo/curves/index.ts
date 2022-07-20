// import { Deformation } from '../../core/modifiers/deformation'
import { Scene, Renderer2D, Rect, Shape, Layer, IPoint } from '../../src/index'
// import { IPoint } from '../../core/point'
import { rotate } from '../../src/core/transform'

export function createCurvesDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const rect = new Rect(100, 100, 200, 200)

  const rect2 = new Rect(400, 100, 300, 200)

  createEllipseFromRect(rect, layer0)
  createEllipseFromRect(rect2, layer0)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function createEllipseFromRect (rect: Rect, layer0: Layer) {
  const [up, right, bottom, left] = rect.toRhombus()

  const c = rect.absCenter

  const cp1 = rotate(up, c, -45)
  const cp2 = { x: rect.absWidth - 8, y: rect.y + 8 }
  const cp3 = { x: rect.absWidth - 8, y: rect.absHeight - 8 }
  const cp4 = { x: rect.x + 8, y: rect.absHeight - 8 }

  const frame = layer0.createShape({ stroke: '#a4a391' })
  frame.rect(rect)

  const circleShape = layer0.createShape({ stroke: '#513131', fill: '#f5f1e0' })
  drawCircle(circleShape, [up, right, bottom, left, cp1, cp2, cp3, cp4])
  /* const shape3 = */ layer0.createShape({ stroke: '#513131', fill: '#100081' })
  // circleShape.addModifier(new Deformation(fig => {
  //   fig.quadraticCurveTo[0].cp = new Point(cp2.x - 95, cp2.y + 100)
  //   shape3.circle(fig.quadraticCurveTo[0].cp, 3)
  // }))

  const spPoints = layer0.createShape({ stroke: '#513131', fill: '#708a41' })
  spPoints.circle(cp1, 3)
  spPoints.circle(cp2, 3)
  spPoints.circle(cp3, 3)
  spPoints.circle(cp4, 3)
  spPoints.circle(rect.absCenter, 4)

  const coord0 = layer0.createShape({ stroke: '#6b7ea6' })
  coord0
    .moveTo(rect.absCenter)
    .lineTo(up)
    .moveTo(rect.absCenter)
    .lineTo(right)

  const coordR1 = layer0.createShape({ stroke: '#117ea6' })
  coordR1
    .moveTo(rect.absCenter)
    .lineTo(rotate(up, rect.absCenter, 45))

  const coordR2 = layer0.createShape({ stroke: '#117e16' })
  coordR2
    .moveTo(rect.absCenter)
    .lineTo(rotate(right, rect.absCenter, 45))

  drawRhombus(layer0, [up, right, bottom, left])
}

function drawRhombus (layer0: Layer, points: IPoint[]) {
  const [up, right, bottom, left] = points
  const arrowShape = layer0.createShape({ stroke: '#a9266c', lineWidth: 2, lineCap: 'round' })
  const shape3 = layer0.createShape({ stroke: '#513131', fill: '#492e38' })
  arrowShape.moveTo(up)
  arrowShape.lineTo(right)
  arrowShape.arrow({ sp: up, ep: right }, 15, '>')

  arrowShape.moveTo(right)
  arrowShape.lineTo(bottom)
  arrowShape.arrow({ sp: right, ep: bottom }, 15, '>')

  arrowShape.moveTo(bottom)
  arrowShape.lineTo(left)
  arrowShape.arrow({ sp: bottom, ep: left }, 15, '>')

  arrowShape.moveTo(left)
  arrowShape.lineTo(up)
  arrowShape.arrow({ sp: left, ep: up }, 15, '>')

  shape3.circle(up, 3)
  shape3.circle(right, 3)
  shape3.circle(bottom, 3)
  shape3.circle(left, 3)
}

function drawCircle (shape: Shape, arr: IPoint[]) {
  const [up, right, bottom, left, cp1, cp2, cp3, cp4] = arr
  shape.moveTo(up)
  shape.quadraticCurveTo(cp2, right)
  shape.quadraticCurveTo(cp3, bottom)
  shape.quadraticCurveTo(cp4, left)
  shape.quadraticCurveTo(cp1, up)
}
