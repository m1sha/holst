import { Scene, Renderer2D, Point, Color, TextBlock } from 'index'

const bigText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum`

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const position = new Point(50, 50)
  const text = new TextBlock('Hello\nWorld!!!\nSome Text Here', { fontSize: '48px', color: Color.white })
  text.target = position
  text.alignment = 'center'
  text.lineHeight = 10
  const bounds = text.bounds.outline(-16)

  const fontSize = '18px'
  const text2 = new TextBlock(bigText, { fontSize, color: Color.darkGrey })
  const position2 = new Point(400, 50)
  text2.lineHeight = 2
  text2.target = position2
  // text2.alignment = 'center'

  const text3 = new TextBlock(bigText, { fontSize, color: Color.darkGrey })
  const position3 = new Point(400, 250)
  text3.target = position3
  text3.lineHeight = 2
  text3.alignment = 'center'

  const text4 = new TextBlock(bigText, { fontSize, color: Color.darkGrey })
  const position4 = new Point(400, 450)
  text4.target = position4
  text4.lineHeight = 2
  text4.alignment = 'right'

  const text5 = new TextBlock(bigText, { fontSize, color: Color.darkGrey })
  const position5 = new Point(400, 650)
  text5.target = position5
  text5.lineHeight = 2
  text5.alignment = 'justify'

  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.darkGrey }).roundRect(bounds, 8)
  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.lightGrey }).roundRect(text2.bounds.outline(-16), 8)
  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.lightGrey }).roundRect(text3.bounds.outline(-16), 8)
  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.lightGrey }).roundRect(text4.bounds.outline(-16), 8)
  layer.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.lightGrey }).roundRect(text5.bounds.outline(-16), 8)
  layer.addTextBlock(text)
  layer.createShape({ fillStyle: Color.red }).circle(position, 3)
  layer.addTextBlock(text2)
  layer.addTextBlock(text3)
  layer.addTextBlock(text4)
  layer.addTextBlock(text5)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
