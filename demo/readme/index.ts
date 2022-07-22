import { Scene, Renderer2D, Color, CubicBezier } from '../../src/index'

export function createReadmeDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const shape = layer.createShape({ fill: Color.blue }).circle({ x: 150, y: 150 }, 50)

  const animation = scene.createAnimation({ duration: 1500 })
  const movement = CubicBezier.linear
  animation.action = ({ t }) => (
    shape.style.fill = Color.fromGradient(movement.calc(t).x, [Color.blue, Color.red, Color.green])
  )
  animation.finish = () => (shape.style.fill = Color.blue)

  shape.on('click', () => {
    animation.start()
  })

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
