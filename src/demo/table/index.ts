import { Table } from '../../core/components/table/table'
import { Scene, Renderer2D, Layer, Point } from 'index'

export function createTableDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  setupCanvas(canvas, layer)
  const size = canvas
  const table = new Table(scene, size)
  const row = table.addRow()
  const cell = row.createCell()
  cell.content = 'AAA'
  cell.content = 'BBB'
  table.create()
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function setupCanvas (canvas: HTMLCanvasElement, layer: Layer) {
  canvas.ondragover = e => {
    e.preventDefault()
    e.dataTransfer!!.dropEffect = 'move'
    canvas.style.borderColor = '#ff0000'
  }
  canvas.ondragleave = e => {
    canvas.style.borderColor = '#515151'
  }
  // canvas.ondragenter = e => {
  //   console.log(e)
  // }
  canvas.ondrop = e => {
    const d = e.dataTransfer!!.getData('text/plain')
    const p = new Point(e.offsetX, e.offsetY) // { x: e.offsetX, y: e.offsetY }
    layer.createTextBlock(d, { fontSize: '28px', color: '#005f71' }, p)
    canvas.style.borderColor = '#515151'
  }
}
