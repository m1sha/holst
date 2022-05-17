import { Size } from '../../core/size'
import { Scene, Renderer2D, Rect, Layer } from 'index'
export function createViewportDemo (canvas: HTMLCanvasElement) {
  const scene = createScene()
  createScroll(scene)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)

  renderer.viewport.x = 0
  renderer.viewport.scale = 1
  renderer.render(scene)
}

function createScene (): Scene {
  const scene = new Scene()
  const layer0 = scene.createLayer()

  layer0
    .createShape({ strokeStyle: '#333' })
    .rect(new Rect(10, 10, 150, 150))
  layer0.createShape({ fillStyle: '#ff00ff' })
    .rect(new Rect(600, 10, 150, 150))
  layer0.createShape({ fillStyle: '#510051' })
    .arc({ x: 500, y: 310 }, 50, 0, Math.PI * 2)
  layer0.createShape({ fillStyle: '#113051', strokeStyle: '#3f3ff3', lineWidth: 4 })
    .moveTo({ x: 100, y: 300 })
    .lineTo({ x: 100, y: 500 })
    .lineTo({ x: 50, y: 400 })
    .closePath()

  return scene
}

interface ScrollSettings {
  size: Size
  height: number
  backgroundColor: string
  borderColor: string
  thumbBackgroundColor: string
  thumbBorderColor: string
}

function createScroll (scene: Scene) {
  const scrollLayer = scene.createLayer('scroll')
  const setting: ScrollSettings = {
    size: { width: 800, height: 600 },
    height: 20,
    backgroundColor: '#ddd',
    borderColor: '#888',
    thumbBackgroundColor: '#444',
    thumbBorderColor: '#333'
  }

  createHScroll(scrollLayer, setting)
  createVScroll(scrollLayer, setting)

  scrollLayer
    .createShape({ fillStyle: setting.backgroundColor, strokeStyle: setting.borderColor })
    .rect(new Rect(setting.size.width - setting.height, setting.size.height - setting.height, setting.height, setting.height))
}

function createHScroll (scrollLayer: Layer, setting: ScrollSettings) {
  const { height, size, backgroundColor, borderColor } = setting
  scrollLayer
    .createShape({ fillStyle: backgroundColor, strokeStyle: borderColor })
    .rect(new Rect(0, size.height - height, size.width - height - 2, height))

  createHScrollThumb(scrollLayer, setting, 60)
}

function createVScroll (scrollLayer: Layer, setting: ScrollSettings) {
  const { height, size, backgroundColor, borderColor } = setting
  scrollLayer
    .createShape({ fillStyle: backgroundColor, strokeStyle: borderColor })
    .rect(new Rect(size.width - height, 0, height, size.height - height - 2))

  createVScrollThumb(scrollLayer, setting, 60)
}

function createHScrollThumb (scrollLayer: Layer, setting: ScrollSettings, width: number) {
  const { size, height, thumbBackgroundColor, thumbBorderColor } = setting
  scrollLayer
    .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
    .rect(new Rect(height, size.height - height, width, height))
}

function createVScrollThumb (scrollLayer: Layer, setting: ScrollSettings, width: number) {
  const { size, height, thumbBackgroundColor, thumbBorderColor } = setting
  scrollLayer
    .createShape({ fillStyle: thumbBackgroundColor, strokeStyle: thumbBorderColor })
    .rect(new Rect(size.width - height, height, height, width))
}
