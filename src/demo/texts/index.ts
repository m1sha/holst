import { Scene, Renderer2D, Point, Color, TextBlock } from 'index'

const bigText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\neiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip\nex ea commodo consequat. Duis aute irure dolor\nin reprehenderit in voluptate velit esse cillum dolore\neu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\nnon proident, sunt in culpa qui officia\ndeserunt mollit anim id est laborum'

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const position = new Point(50, 50)
  const text = new TextBlock('Hello\nWorld!!!\nSome Text Here', { fontSize: '48px', color: Color.white })
  text.target = position
  text.alignment = 'center'
  text.lineHeight = 10
  const bounds = text.bounds.outline(-16)

  const text2 = new TextBlock(bigText, { fontSize: '18px', color: Color.black })
  const position2 = new Point(400, 50)
  text2.target = position2
  // text2.alignment = 'center'

  const text3 = new TextBlock(bigText, { fontSize: '18px', color: Color.black })
  const position3 = new Point(400, 250)
  text3.target = position3
  text3.alignment = 'center'

  const text4 = new TextBlock(bigText, { fontSize: '18px', color: Color.black })
  const position4 = new Point(400, 450)
  text4.target = position4
  text4.alignment = 'right'

  const text5 = new TextBlock(bigText, { fontSize: '18px', color: Color.black })
  const position5 = new Point(400, 650)
  text5.target = position5
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
