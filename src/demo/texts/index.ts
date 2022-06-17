import { Matrix2D } from '../../core/matrix'
import { Scene, Renderer2D, Point, Color, TextBlock, Layer } from 'index'
import { Size } from '../../core/size'

const bigText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proidentsas,
sunt in culpa qui officia deserunt mollit anim id est laborum`

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()

  const position = new Point(100, 150)
  const text = createTextBlockInCircle('Your\nAd\nCan be here', Color.white, position, layer)

  createTextBlock(bigText, '18px', Color.darkGrey, new Point(400, 50), layer)
  createTextBlock(bigText, '18px', Color.darkGrey, new Point(400, 250), layer).alignment = 'center'
  createTextBlock(bigText, '18px', Color.darkGrey, new Point(400, 450), layer).alignment = 'right'
  createTextBlock(bigText, '18px', Color.darkGrey, new Point(400, 650), layer).alignment = 'justify'

  createTextBlock(bigText, '18px', Color.darkGrey, new Point(40, 400), layer, { width: 200, height: 100 })

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)

  let i = 1
  let a = 0.02
  let t = 0.5
  renderer.onFrameChanged = () => {
    text.injectTransform(Matrix2D.identity.scale({ x: i, y: i }, text.bounds.absCenter).rotate(t, text.bounds.absCenter))
    if (i < 0.8) a = 0.02
    if (i > 1.2) a = -0.02

    i += a
    t += -0.5
    if (t < -360) t = 0
  }
}

function createTextBlock (text: string, fontSize: string, color: Color, position: Point, layer: Layer, size?: Size) {
  const block = new TextBlock(text, { fontName: 'Roboto', fontSize, color })
  block.lineHeight = 2
  block.target = position
  block.size = size
  const bounds = block.bounds.outline(-16)
  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.lightGrey }).roundRect(bounds, 8)
  layer.addTextBlock(block)
  layer.createShape({ fillStyle: Color.red }).circle(position, 3)
  setHover(block)
  return block
}

function createTextBlockInCircle (text: string, color: Color, position: Point, layer: Layer) {
  const block = new TextBlock(text, { fontSize: '28px', color })
  block.lineHeight = 10
  block.alignment = 'center'
  block.target = position
  const bounds = block.bounds.outline(-32)
  layer.createShape({ fillStyle: Color.lightGrey }).circle(bounds.absCenter, bounds.width / 2)
  layer.addTextBlock(block)
  layer.createShape({ fillStyle: Color.red }).circle(position, 3)
  setHover(block)
  return block
}

function setHover (text: TextBlock) {
  const color = text.style.color
  text
    .on('hover', () => (text.style.color = Color.red))
    .on('leave', () => (text.style.color = color))
}
