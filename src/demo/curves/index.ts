import { Scene, Renderer2D, Rect } from 'index'

export function createCurvesDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const shape = layer0.createShape({ strokeStyle: '#513131' })
  const shape2 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#708a41' })
  const shape3 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#700081' })
  const shape4 = layer0.createShape({ strokeStyle: '#d1d1d1' })
  shape.style.fillStyle = '#708a41'

  const rect = new Rect(100, 100, 200, 200)

  const up = { x: rect.absCenter.x, y: rect.y }
  const right = { x: rect.absWidth + 0, y: rect.absCenter.y }
  const end = { x: rect.absCenter.x, y: rect.absHeight + 0 }
  const left = { x: rect.x - 0, y: rect.absCenter.y }

  const cp1 = { x: rect.x + 8, y: rect.y + 8 }
  const cp2 = { x: rect.absWidth - 8, y: rect.y + 8 }
  const cp3 = { x: rect.absWidth - 8, y: rect.absHeight - 8 }
  const cp4 = { x: rect.x + 8, y: rect.absHeight - 8 }

  shape.moveTo(up)
  shape.quadraticCurveTo(cp2, right)
  shape.quadraticCurveTo(cp3, end)
  shape.quadraticCurveTo(cp4, left)
  shape.quadraticCurveTo(cp1, up)

  shape2.circle(cp1, 3)
  shape2.circle(cp2, 3)
  shape2.circle(cp3, 3)
  shape2.circle(cp4, 3)

  shape3.circle(up, 3)
  shape3.circle(right, 3)
  shape3.circle(end, 3)
  shape3.circle(left, 3)

  shape4.rect(rect)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
