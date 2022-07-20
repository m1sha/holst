import { Table } from '../../src/components'
import { Scene, Renderer2D, Point, Rect, TextBlock, Shape } from '../../src/index'
// import { createTable } from './table-data'

export function createTableDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const rect = new Rect(Point.zero, canvas).outline(32)
  const table = new Table(rect)

  // createTable(table)

  table.create(scene)

  const layer = scene.createLayer()
  table.onDrop = (data, _, rect) => {
    const cardRect = rect.outline(10, 8, -40, 8)
    const cardShape = layer.createShape({ fill: '#505559' }).roundRect(cardRect, 8)

    const textStyle = { fontSize: '24px', color: '#f1fff1' }
    const text = new TextBlock(data as string, textStyle)
    text.target = new Point(rect).add({ x: 20, y: 20 })
    text.size = rect.outline(20)
    text.alignment = 'center'
    text.overflow = 'word-break + clip'
    layer.addTextBlock(text)
    layer.order = 100

    createCardControl(cardShape, text)
  }

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function createCardControl (cardShape: Shape, text: TextBlock) {
  const cardStyle = cardShape.copyStyle()
  const textStyle = text.copyStyle()
  cardShape
    .on('hover', () => {
      cardShape.style.fill = '#808589'
      text.style.color = '#4141f1'
    })
    .on('leave', () => {
      cardShape.style.fill = cardStyle.fill
      text.style.color = textStyle.color
    })
    .on('mousedown', () => {})
    .on('mouseup', () => {})
    .on('mousemove', e => {
      if (!e.event.pressed) {
        console.log(e.event.pressed)
        return
      }
      console.log(e.event.pressed)
      const rect = cardShape.roundRects[0]
      rect.x = e.event.origin.offsetX
      rect.y = e.event.origin.offsetY

      text.target = new Point(rect).add({ x: 20, y: 20 })
    })
}
