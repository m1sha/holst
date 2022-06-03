import { Deformation } from '../../core/modifiers/deformation'
import { Scene, Renderer2D, Point, Shape } from 'index'
import { Size } from '../../core/size'
import { getColor } from './colors'
import { Figure } from '../../core/primitives/types/figures'

interface Element {
  shape: Shape
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
  const elementCount = 1
  for (let i = 0; i < elementCount; i++) {
    const shape = layer.createShape({ strokeStyle: getColor(), fillStyle: getColor() })
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    const r = Math.floor(Math.random() * 16) + 10
    shape.circle({ x, y }, r)
    const el: Element = {
      shape,
      shift: new Point(0, 0)
    }
    shape.addModifier(new Deformation(f => onShapeDeformation(el, f)))
    result.push(el)
  }
  return result
}

function onShapeDeformation (el: Element, f: Figure) {
  // f.circle[0].r = 2
}

function update (elements: Element[], size: Size) {
  const m = new Point(0.5, 0)

  for (const el of elements) {
    el.shift = el.shift.add(m)
    if (el.shift.x + el.shape.bounds.x > size.width) m.x = -0.5
    if (el.shape.bounds.x - el.shift.x < 0) m.x = 0.5
    el.shape.move(el.shift)
  }
}
