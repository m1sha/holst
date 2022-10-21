import { Scene, Renderer2D, TextBlock, Rect, Shape, LinearGradient, Point, Color } from '../../src/index'
import { oneLineText } from './texts'

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const rect = new Rect(20, 20, 100, 100)

  const g = new LinearGradient(new Point(20, 0), new Point(100, 0), [{ offset: 0, color: 'blue' }, { offset: 0.5, color: 'red' }])
  g.addStopColor(1, Color.green)
  const shape = Shape.create({ fill: g }).rect(rect)

  // alert(new Color('#ff00ff80').toString())

  const g2 = new LinearGradient(new Point(0, 0), new Point(0, 100))
  g2.addStopColor(0, 'black')
  g2.addStopColor(1, 'white')

  const text = TextBlock.create(oneLineText, { fontSize: '18px', color: 'transparent', bold: 'bold', outlineColor: '#fff', outlineWidth: 2 }, rect)
  text.size = rect
  text.verticalAlignment = 'center'
  text.alignment = 'center'
  text.overflow = 'word-break + clip'

  layer.addShape(shape)
  layer.addTextBlock(text)

  createScene(scene, canvas)
}

const createScene = (scene: Scene, canvas: HTMLCanvasElement) => {
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
