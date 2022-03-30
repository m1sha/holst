import { Point, Rect, Renderer2D, Scene } from '@/.'

export function createRelativeDrawExample (canvas: HTMLCanvasElement) {
  const scene = new Scene(canvas)
  const layer = scene.createLayer()

  layer.createShape({ fillStyle: '#eee' })
    .rect(new Rect(0, 0, 100, 100))

  const pos = layer.createShape({ strokeStyle: 'blue', lineWidth: 2 })
    .relative
    .moveTo(new Point(20, 20))
    .lineTo(new Point(0, 20))
    .lineTo(new Point(20, 0))
    .lineTo(new Point(0, -20))
    .lineTo(new Point(20, 0))
    .position
  layer.createShape({ strokeStyle: 'green', lineWidth: 1 })
    .relative
    .moveTo(pos)
    .ellipse(10, 10, Math.PI, 0, Math.PI * 2)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
