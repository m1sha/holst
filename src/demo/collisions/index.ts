import { Scene, Renderer2D, Point, Shape } from 'index'
import { Size } from '../../core/size'
import { getColor } from './colors'

interface Element {
  shape: Shape
  velocity: Point
  acceleration: Point
}

export function createCollisionsDemo (canvas: HTMLCanvasElement) {
  const sceneSize: Size = canvas
  const scene = new Scene()
  const elements = initScene(scene, sceneSize)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
  renderer.onFrameChanged = () => {
    update(elements, sceneSize)
  }
}

function initScene (scene: Scene, { width, height }: Size): Element[] {
  const result = []
  const layer = scene.createLayer('collisions')
  const elementCount = 5
  for (let i = 0; i < elementCount; i++) {
    // const frame = layer.createShape({ strokeStyle: getColor() })

    const shape = layer.createShape({ fillStyle: getColor() })
    const x = Math.floor(Math.random() * (width - 150)) + 100
    const y = Math.floor(Math.random() * (height - 150)) + 100
    const r = Math.floor(Math.random() * 30) + 25

    shape.circle({ x, y }, r)

    const el: Element = {
      shape,
      velocity: new Point(Math.random() * 7 + 2, (Math.random() * 7 + 2)),
      acceleration: new Point(0.1, 0.1)
    }

    result.push(el)
  }
  return result
}

function update (elements: Element[], size: Size) {
  collisionsDetect(elements)
  for (const el of elements) {
    const c = el.shape.circles[0]
    if (c.x + c.radius > size.width || c.x - c.radius < 0) el.velocity.x *= -1
    if (c.y + c.radius > size.height || c.y - c.radius < 0) el.velocity.y *= -1
    el.shape.circles[0].x += el.velocity.x + el.acceleration.x
    el.shape.circles[0].y += el.velocity.y + el.acceleration.y
  }
}

function collisionsDetect (elements: Element[]) {
  let i = 0
  let j = 0
  for (const el of elements) {
    const c = el.shape.circles[0]
    for (const el2 of elements) {
      if (i === j) continue
      const c2 = el2.shape.circles[0]
      if (intersec(c, c2)) {
        // el.velocity.x *= -1
        // el.velocity.y *= -1
        el.shape.style.fillStyle = '#ff0000'
      } else {
        el.shape.style.fillStyle = '#3f3f3f'
      }
      j++
    }
    i++
  }
}

function intersec (circle1:any, circle2: any) {
  const dx = (circle1.x + circle1.radius) - (circle2.x + circle2.radius)
  const dy = (circle1.y + circle1.radius) - (circle2.y + circle2.radius)
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance < circle1.radius + circle2.radius
}
