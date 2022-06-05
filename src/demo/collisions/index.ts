import { Scene, Renderer2D, Point, Shape } from 'index'
import { Size } from '../../core/size'
import { getColor } from './colors'

interface Element {
  shape: Shape
  velocity: Point
  shift: Point
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
  const elementCount = 2
  for (let i = 0; i < elementCount; i++) {
    // const frame = layer.createShape({ strokeStyle: getColor() })
    const shape = layer.createShape({ fillStyle: getColor() })
    const x = Math.floor(Math.random() * width - 100) + 150
    const y = Math.floor(Math.random() * height - 100) + 150
    const r = Math.floor(Math.random() * 30) + 25
    shape.circle({ x, y }, r)
    console.dir(shape)
    const el: Element = {
      shape,
      shift: new Point(0, 0),
      velocity: new Point(Math.random() * 7 + 2, (Math.random() * 7 + 2))
    }
    // shape.addModifier(new Deformation(f => onShapeDeformation(el, f)))
    // shape.circles[0].r = 35
    result.push(el)
    // frame.rect(shape.bounds.outline(-8))
  }
  return result
}

function update (elements: Element[], size: Size) {
  collisionsDetect(elements)
  for (const el of elements) {
    const c = el.shape.circles[0]
    if (c.x + c.radius > size.width || c.x - c.radius < 0) el.velocity.x *= -1
    if (c.y + c.radius > size.height || c.y - c.radius < 0) el.velocity.y *= -1
    el.shape.circles[0].x += el.velocity.x
    el.shape.circles[0].y += el.velocity.y
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
      if (c.x > c2.x - c2.radius && c.x < c2.x + c2.radius) {
        el.velocity.x *= -1
        // el2.velocity.x *= -1
      }
      if (c.y > c2.y - c2.radius && c.y < c2.y + c2.radius) {
        el.velocity.y *= -1
        // el2.velocity.y *= -1
      }
      j++
    }
    i++
  }
}
