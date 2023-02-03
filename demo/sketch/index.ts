import { Scene, Renderer2D, Rect, Sketch } from '../../src/index'

export function createDemo (div: HTMLDivElement) {
  const scene = new Scene()
  const layer = scene.createLayer()

  const shape = new Sketch(0, { stroke: '#333' })
  shape.rect(10, 10, 100, 100)
  layer.add(shape)

  const shape1 = new Sketch(0, { stroke: '#135313' })
  const line = shape1.line()
    .moveTo({ x: 10, y: 120 })
    .lineTo({ x: 110, y: 210 }, [{ x: 55, y: 80 }])
    .lineTo({ x: 310, y: 280 }, [{ x: 55, y: 80 }])
    .lineTo({ x: 110, y: 380 }, [{ x: 155, y: 280 }, { x: 80, y: 380 }])
    .lineTo({ x: 10, y: 120 })
  layer.add(shape1)

  createView(scene, div)

  const shape2 = new Sketch(0, { stroke: '#f35313' })
  shape2.circle(100, 100, 40)
  layer.add(shape2)

  const shape3 = new Sketch(0, { stroke: '#f353f3' })
  shape3.ellipse(300, 100, 40, 80)
  layer.add(shape3)

  const shape4 = new Sketch(0, { stroke: '#136343' })
  shape4.arc(300, 300, 40, 0, Math.PI / 2)
  layer.add(shape4)

  const shape5 = new Sketch(0, { stroke: '#1300f3' })
  shape5.arc(500, 300, 90, 0, Math.PI)
  layer.add(shape5)

  const shape6 = new Sketch(0, { stroke: '#136023' })
  shape6.rect(new Rect(500, 100, 190, 80), 18)
  layer.add(shape6)

  const shape7 = new Sketch(0, { stroke: '#438393' })
  shape7.circle(400, 100, 80, 4, 0.9)
  layer.add(shape7)

  line.segments[1].x = 400
}

function createView (scene: Scene, div: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')!
  const renderer = new Renderer2D(ctx)
  renderer.render(scene)
  div.append(canvas)
}
