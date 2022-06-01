import { Deformation } from '../../core/modifiers/deformation'
import { Scene, Renderer2D, Rect, Point, Shape } from 'index'
import { IPoint } from '../../core/point'

export function createCurvesDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const circleShape = layer0.createShape({ strokeStyle: '#513131' })
  circleShape.style.fillStyle = '#848985'

  const shape2 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#708a41' })
  const shape3 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#700081' })
  const shape4 = layer0.createShape({ strokeStyle: '#d1d1d1' })
  const arrowShape = layer0.createShape({ strokeStyle: '#a9266c', lineWidth: 2, lineCap: 'round' })

  const rect = new Rect(100, 100, 200, 200)
  const [up, right, bottom, left] = rect.toRhombus()

  const cp1 = { x: rect.x + 8, y: rect.y + 8 }
  const cp2 = { x: rect.absWidth - 8, y: rect.y + 8 }
  const cp3 = { x: rect.absWidth - 8, y: rect.absHeight - 8 }
  const cp4 = { x: rect.x + 8, y: rect.absHeight - 8 }

  drawCircle(circleShape, [up, right, bottom, left, cp1, cp2, cp3, cp4])

  circleShape.addModifier(new Deformation(fig => {
    fig.quadraticCurveTo[0].cp = new Point(cp2.x - 95, cp2.y + 100)
    shape3.circle(fig.quadraticCurveTo[0].cp, 3)
  }))

  shape2.circle(cp1, 3)
  shape2.circle(cp2, 3)
  shape2.circle(cp3, 3)
  shape2.circle(cp4, 3)

  // shape2.on('click', e => {
  //   p1 = new Point(e.event)
  // })

  shape3.circle(up, 3)
  shape3.circle(right, 3)
  shape3.circle(bottom, 3)
  shape3.circle(left, 3)

  shape4.rect(rect)

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

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function drawCircle (shape: Shape, arr: IPoint[]) {
  const [up, right, bottom, left, cp1, cp2, cp3, cp4] = arr
  shape.moveTo(up)
  shape.quadraticCurveTo(cp2, right)
  shape.quadraticCurveTo(cp3, bottom)
  shape.quadraticCurveTo(cp4, left)
  shape.quadraticCurveTo(cp1, up)
}
