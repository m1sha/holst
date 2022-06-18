import { Table } from '../../core/components/table/table'
import { Scene, Renderer2D, Layer, Point, Rect } from 'index'

const obj = {
  isDragover: false
}

export function createTableDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  setupCanvas(canvas, layer)
  const size = canvas
  const rect = new Rect(Point.zero, size).outline(32)
  const table = new Table(scene, rect)
  table.draggable = obj

  const row1 = table.addRow()
  const cell11 = row1.createCell()
  cell11.content = 'AAA'
  const cell12 = row1.createCell()
  cell12.content = 'BBB'
  const cell13 = row1.createCell()
  cell13.content = 'Ccc'

  const row2 = table.addRow()
  const cell21 = row2.createCell()
  cell21.content = 'DDd'
  const cell22 = row2.createCell()
  cell22.content = 'eEe'
  const cell23 = row2.createCell()
  cell23.content = 'FFFf'

  table.create()
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function setupCanvas (canvas: HTMLCanvasElement, layer: Layer) {
  canvas.ondragover = e => {
    e.preventDefault()
    e.dataTransfer!!.dropEffect = 'move'
    obj.isDragover = true
    // canvas.style.borderColor = '#ff0000'
  }
  canvas.ondragleave = e => {
    obj.isDragover = false
  }
  // canvas.ondragenter = e => {
  //   console.log(e)
  // }
  canvas.ondrop = e => {
    const d = e.dataTransfer!!.getData('text/plain')
    const p = new Point(e.offsetX, e.offsetY) // { x: e.offsetX, y: e.offsetY }
    layer.createTextBlock(d, { fontSize: '28px', color: '#005f71' }, p)
    layer.order = 100
  }
}
