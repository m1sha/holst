import { Scene, Renderer2D, Color, Point } from 'index'

export function createPaintEditor (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  layer0
    .createShape({ fillStyle: new Color('#008811') })
    .ellipse(new Point(300, 300), 50, 50, 0, 0, Math.PI * 2)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
