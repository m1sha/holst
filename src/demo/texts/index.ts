import { Scene, Renderer2D, Point, Color } from 'index'

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()

  const p = new Point(100, 100)
  layer0.createShape({ fillStyle: Color.red }).circle(p, 3)
  const b = layer0.createTextBlock('Hello\nWorld!!!\nSome Text Here', { fontSize: '48px' }, p).bounds

  layer0.createShape({ strokeStyle: Color.lightGrey }).rect(b)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
