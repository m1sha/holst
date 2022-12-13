import { DynamicCanvasRenderer2D, Scene } from '../../src/index'
export function createDemo (container: HTMLDivElement) {
  const scene = new Scene()
  const renderer = new DynamicCanvasRenderer2D()
  renderer.render(scene)

  for (const c of renderer.canvases) {
    container.appendChild(c)
  }

  const l = scene.createLayer()
  l.canvasOrder = 'background'
  l.createShape({ fill: '#333' }).circle(150, 75, 50)

  const l2 = scene.createLayer()
  l2.canvasOrder = 'foreground'
  l2.createShape({ fill: '#eee' }).circle(150, 75, 25)
}
