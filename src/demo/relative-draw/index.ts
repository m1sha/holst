import { Point, Rect, Renderer2D, Scene } from '@/.'

export function createRelativeDrawExample (canvas: HTMLCanvasElement) {
  const scene = new Scene(canvas)
  const layer = scene.createLayer()

  layer.createShape({ fillStyle: 'grey' })
    .rect(new Rect(0, 0, 100, 100))

  layer.createShape({ strokeStyle: 'red' })
    .moveToR(new Point(10, 10))
    .lineR(new Point(10, 10))

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
