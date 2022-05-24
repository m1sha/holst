import { Scene, Renderer2D } from 'index'

export function createCurvesDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const shape = layer0.createShape({ strokeStyle: '#513131' /*, fillStyle: '#708a41' */ })

  shape.moveTo({ x: 10, y: 10 })
  shape.quadraticCurveTo({ x: 30, y: 120 }, { x: 600, y: 100 })

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
