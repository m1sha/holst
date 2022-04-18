import { Point, Rect, Renderer2D, Scene } from 'index'

export function createRelativeDrawExample (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const bg = scene.createLayer()
  const layer = scene.createLayer()

  bg.createShape({ fillStyle: '#1ee' })
    .rect(new Rect(0, 0, 100, 100))

  const pos = layer.createShape({ strokeStyle: 'blue', lineWidth: 4, lineCap: 'round' })
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
    .ellipse(10, 10, 0, 0, Math.PI * 2)

  const b = layer.bounds

  layer.createShape({ strokeStyle: 'red' })
    .rect(b)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
