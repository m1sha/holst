import { Scene, Renderer2D, Point, Color, TextBlock, Rect } from 'index'

export function createTextsDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const position = new Point(100, 100)
  const text = new TextBlock('Hello\nWorld!!!\nSome Text Here', { fontSize: '48px', color: Color.white })
  text.target = position
  text.alignment = 'center'
  text.lineHeight = 10
  const bounds = new Rect(text.bounds).outline(-16)

  layer0.createShape({ strokeStyle: Color.lightGrey, fillStyle: Color.darkGrey }).roundRect(bounds, 8)
  layer0.addTextBlock(text)
  layer0.createShape({ fillStyle: Color.red }).circle(position, 3)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
