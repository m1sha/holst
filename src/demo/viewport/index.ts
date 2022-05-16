import { Scene, Renderer2D, Rect } from 'index'
export function createViewportDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  scene
    .createLayer()
    .createShape({ strokeStyle: '#333' })
    .rect(new Rect(10, 10, 150, 150))

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.viewport.x = 10
  renderer.render(scene)

  console.log(renderer.viewport)
}
