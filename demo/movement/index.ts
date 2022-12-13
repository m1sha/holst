import { Scene, Renderer2D, Shape, Rect, CubicBezier } from '../../src/index'
// import { CubicBezier } from '../../core/motion/cubic-bezier'

export function createDemo (appDiv: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  canvas.height = 600
  canvas.width = 800
  appDiv.append(canvas)
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const shp0 = layer0.createShape({ stroke: '#333', fill: '#84a2cb' })
  shp0.rect(new Rect(10, 10, 100, 100))

  const shp1 = layer0.createShape({ stroke: '#513131', fill: '#8881d8' })
  shp1.rect(new Rect(10, 120, 100, 100))

  const shp2 = layer0.createShape({ stroke: '#513131', fill: '#708a41' })
  shp2.roundRect(new Rect(10, 230, 100, 100), 16)

  const shp3 = layer0.createShape({ fill: '#86414c' })
  shp3.arc({ x: 10 + 50, y: 340 + 50 }, 50, 0, Math.PI * 2)

  const shp4 = layer0.createShape({ fill: '#d1c8b7' })
  shp4.ellipse({ x: 10 + 50, y: 450 + 50 }, 55, 24, 0, 0, Math.PI * 2)

  const obj = {
    t: 0,
    sign: 1
  }

  const ms = [
    CubicBezier.easeInOut,
    CubicBezier.linear,
    CubicBezier.easeIn,
    CubicBezier.easeOut,
    new CubicBezier(1, 0.3, 0.22, 1)
  ]

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
  renderer.onFrameChanged = () => {
    movement([shp0, shp1, shp2, shp3, shp4], ms, obj)
  }
}

function movement (shapes: Shape[], ms: CubicBezier[], obj: { t: number, sign: number }) {
  for (let i = 0; i < shapes.length; i++) {
    const m = ms[i]
    const shape = shapes[i]
    const p = m.calc(obj.t)
    shape.move({ x: p.x * 650, y: p.y })
  }

  obj.t += 0.01 * obj.sign
  if (obj.t > 1) obj.sign *= -1
  if (obj.t < 0) obj.sign *= -1
}
