import { Scene, DynamicRenderer2D, Color } from '../../src/index'

export function createDemo (app: HTMLDivElement) {
  const scene = new Scene()

  scene.createLayer().createShape({ fill: '#881222' }).rect(20, 20, 150, 200)

  const r = scene.createLayer().createShape({ fill: '#881892' }).rect(120, 20, 150, 200)

  const ani = scene.createAnimation({ duration: 1500, infinity: true })
  ani.action = ({ t }) => {
    r.style.fill = Color.fromGradient(t, ['#00ff00', '#00ffff'])
  }
  ani.play()

  const renderer = new DynamicRenderer2D({ width: 800, height: 600 })
  renderer.render(scene)
  app.append(renderer.element)
}
