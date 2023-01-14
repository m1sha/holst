import { Scene, MultiCanvasRenderer } from '../../src/index'

export function createDemo (app: HTMLDivElement) {
  const scene = new Scene()

  scene.createLayer().createShape({ fill: '#881222' }).rect(20, 20, 150, 200)

  scene.createLayer().createShape({ fill: '#881892' }).rect(120, 20, 150, 200)

  const renderer = new MultiCanvasRenderer()
  renderer.render(scene)
  app.append(renderer.element)
}
