// import { Matrix2D } from '../../core/matrix'
import { Scene, Renderer2D, Point, Color, TextBlock, Layer } from 'index'
import { Size } from '../../core/size'

const bigText2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proidentsas,
sunt in culpa qui officia deserunt mollit anim id est laborum`

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()

  const position = new Point(100, 150)
  const text = createTextBlockInCircle('Your\nAd\nCan be here', Color.white, position, layer)
  text.on('click', () => {})

  const t2 = createTextBlock(bigText2, '18px', Color.darkGrey, new Point(400, 50), layer)
  createTextBlock(bigText2, '18px', Color.darkGrey, new Point(400, 250), layer).alignment = 'center'
  createTextBlock(bigText2, '18px', Color.darkGrey, new Point(400, 450), layer).alignment = 'right'
  createTextBlock(bigText2, '18px', Color.darkGrey, new Point(400, 650), layer).alignment = 'justify'

  createTextBlock(bigText2, '18px', Color.darkGrey, new Point(40, 400), layer, { width: 300, height: 100 }, true)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)

  const task = scene.taskManager.create({ timeout: 3000 })
  task.action = () => {
    t2.style.color = Color.green
    console.log('green')
  }
  const task2 = scene.taskManager.create({ timeout: 6000 })
  task2.action = () => {
    t2.style.color = Color.darkGrey
    console.log('darkGrey')
  }

  // let i = 1
  // let a = 0.02
  // let t = 0.5
  // let colorValue = 0.0
  // renderer.onFrameChanged = () => {
  //   text.injectTransform(Matrix2D.identity.scale({ x: i, y: i }, text.bounds.absCenter).rotate(t, text.bounds.absCenter))
  //   if (i < 0.8) a = 0.02
  //   if (i > 1.2) a = -0.02

  //   i += a
  //   t += -0.5
  //   if (t < -360) t = 0
  //   colorValue += 0.005
  //   if (colorValue >= 1) colorValue = 0

  //   text.style.color = Color.fromGradient(colorValue, ['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff0000'])
  // }
}

function createTextBlock (text: string, fontSize: string, color: Color, position: Point, layer: Layer, size?: Size, wrap?: boolean) {
  const block = new TextBlock(text, { fontName: 'Roboto', fontSize, color })
  block.lineHeight = 4
  block.target = position
  block.size = size
  if (wrap) block.overflow = 'word-break'
  const bounds = block.bounds.outline(-16)
  layer.createShape({ stroke: Color.lightGrey, fill: Color.lightGrey }).roundRect(bounds, 8)
  layer.addTextBlock(block)
  layer.createShape({ fill: Color.blue }).circle(position, 2)
  setHover(block)
  return block
}

function createTextBlockInCircle (text: string, color: Color, position: Point, layer: Layer) {
  const block = new TextBlock(text, { fontSize: '28px', color })
  block.lineHeight = 10
  block.alignment = 'center'
  block.target = position
  const bounds = block.bounds.outline(-32)
  layer.createShape({ fill: Color.lightGrey }).circle(bounds.absCenter, bounds.width / 2)
  layer.addTextBlock(block)
  layer.createShape({ fill: Color.darkGrey }).circle(position, 3)
  setHover(block)
  return block
}

function setHover (text: TextBlock) {
  const color = text.style.color
  text
    .on('hover', () => (text.style.color = Color.red))
    .on('leave', () => (text.style.color = color))
}
