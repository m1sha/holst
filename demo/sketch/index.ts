import { Scene, Renderer2DV, Rect } from '../../src/index'

export function createDemo (div: HTMLDivElement) {
  const scene = new Scene()
  const layer = scene.createLayer()

  layer
    .createSketch({ stroke: '#333' })
    .rect(10, 10, 100, 100)

  const line = layer
    .createSketch({ stroke: '#135313' })
    .line()
    .moveTo({ x: 10, y: 120 })
    .lineTo({ x: 110, y: 210 }, [{ x: 55, y: 80 }])
    .lineTo({ x: 310, y: 280 }, [{ x: 55, y: 80 }])
    .lineTo({ x: 110, y: 380 }, [{ x: 155, y: 280 }, { x: 80, y: 380 }])
    .lineTo({ x: 10, y: 120 })

  createView(scene, div)

  layer
    .createSketch({ stroke: '#f35313' })
    .circle(100, 100, 40)

  layer
    .createSketch({ stroke: '#f353f3' })
    .ellipse(300, 100, 40, 80)

  layer
    .createSketch({ stroke: '#136343' })
    .arc(300, 300, 40, 0, Math.PI / 2)

  layer
    .createSketch({ stroke: '#1300f3' })
    .arc(500, 300, 90, 0, Math.PI)

  layer
    .createSketch({ stroke: '#136023' })
    .rect(new Rect(500, 100, 190, 80), 18)

  layer
    .createSketch({ stroke: '#438393' })
    .circle(400, 100, 80, 4, 0.9)

  line.segments[1].x = 400
}

function createView (scene: Scene, div: HTMLDivElement) {
  const renderer = new Renderer2DV({ width: 800, height: 600 })
  renderer.render(scene)
  div.append(renderer.element)
}
