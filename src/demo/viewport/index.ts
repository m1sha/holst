import { Scene, Renderer2D, Rect, Point } from 'index'
import { ScrollBox } from '../../core/components/scroll-box'
export function createViewportDemo (canvas: HTMLCanvasElement) {
  const scene = createScene()
  const renderer = new Renderer2D(canvas.getContext('2d')!!)

  const scrollBox = new ScrollBox(scene, renderer.viewport)
  scrollBox.create()

  renderer.viewport.x = 0
  renderer.viewport.scale = 1

  renderer.render(scene)
}

function createScene (): Scene {
  const scene = new Scene()
  const layer0 = scene.createLayer()

  const s0 = layer0
    .createShape({ strokeStyle: '#333' })
    .rect(new Rect(10, 10, 150, 150))

  s0.move({ x: 100, y: 10 })

  let state = 0
  let point = new Point(0, 0)
  const s = layer0.createShape({ fillStyle: '#ff00ff' })
    .rect(new Rect(600, 10, 150, 150))
  s
    // .on('click', () => alert('Rect'))
    .on('hover', e => (s.style.fillStyle = '#1ff01f'))
    .on('leave', e => (s.style.fillStyle = '#ff00ff'))
    .on('mousedown', e => {
      state = 1
      point = new Point(e.event.offsetX, e.event.offsetY)
    })
    .on('mouseup', () => {
      state = 0
      point = new Point(0, 0)
    })
    .on('mousemove', e => {
      if (state === 1) {
        if (point.x === 0 && point.y === 0) return
        // console.log('x: %d y: %d', e.event.offsetX, e.event.offsetY)
        let point2 = new Point(e.event.offsetX, e.event.offsetY)
        point2 = point2.dec(point)
        s.move(point2)
      }
    })

  layer0.createShape({ fillStyle: '#510051', strokeStyle: '#3f3f53', lineWidth: 12 })
    .arc({ x: 500, y: 310 }, 50, Math.PI, Math.PI * 2)
  layer0.createShape({ fillStyle: '#113051', strokeStyle: '#3f3ff3', lineWidth: 4 })
    .moveTo({ x: 100, y: 300 })
    .lineTo({ x: 100, y: 500 })
    .lineTo({ x: 50, y: 400 })
    .closePath()

  return scene
}
