import { Viewport } from '../../core/viewport'
import { Scene, Renderer2D, Rect, Point, Shape } from 'index'
import { ScrollBox } from '../../core/components/scroll-box'
export function createViewportDemo (canvas: HTMLCanvasElement, controls: HTMLCanvasElement[]) {
  const scene = createScene()
  const renderer = new Renderer2D(canvas.getContext('2d')!!)

  const scrollBox = new ScrollBox(scene, renderer.viewport)
  scrollBox.create()

  // renderer.viewport.x = 120
  renderer.viewport.y = 120
  renderer.viewport.scale = 1
  setEvents(controls, renderer.viewport)
  renderer.render(scene)
}

function createScene (): Scene {
  const scene = new Scene()
  const layer0 = scene.createLayer()

  const rect = layer0
    .createShape({ strokeStyle: '#333' })
    .rect(new Rect(10, 10, 150, 150))
  setInteractive(rect)

  const fillRect = layer0.createShape({ fillStyle: '#ff00ff' })
    .rect(new Rect(600, 10, 150, 150))
  setInteractive(fillRect)

  const arc = layer0.createShape({ fillStyle: '#510051', strokeStyle: '#3f3f53', lineWidth: 12 })
    .arc({ x: 500, y: 310 }, 50, Math.PI, Math.PI * 2)
  setInteractive(arc)

  const triangle = layer0.createShape({ fillStyle: '#113051', strokeStyle: '#3f3ff3', lineWidth: 4 })
    .moveTo({ x: 100, y: 300 })
    .lineTo({ x: 100, y: 500 })
    .lineTo({ x: 50, y: 400 })
    .closePath()
  setInteractive(triangle)

  return scene
}

function setInteractive (shape: Shape) {
  let start = Point.zero
  let shift = Point.zero
  const style = shape.copyStyle()
  shape
    .on('hover', e => {
      shape.style.fillStyle = '#cd853a'
      e.cursor = 'move'
    })
    .on('leave', e => {
      shape.style.fillStyle = style.fillStyle
      e.cursor = 'default'
    })
    .on('mousedown', e => {
      start = new Point(e.event)
    })
    .on('mouseup', () => {
      shift = shape.shift
    })
    .on('mousemove', e => {
      if (!e.event.pressed || !e.event.hit) return
      const point = new Point(e.event)
        .dec(start)
        .add(shift)
      shape.move(point)
    })
}

function setEvents (controls: HTMLCanvasElement[], viewport: Viewport) {
  const [zoom, panX, panY] = controls
  zoom.onchange = e => console.log(e)
  panX.onchange = e => {
    const val = +(e.target as HTMLInputElement).value
    viewport.x = val
  }
  panY.onchange = e => {
    const val = +(e.target as HTMLInputElement).value
    viewport.y = val
  }
}
