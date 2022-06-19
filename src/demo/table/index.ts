import { Table } from '../../core/components/table/table'
import { Scene, Renderer2D, Point, Rect } from 'index'
import { createTable } from './table-data'

export function createTableDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const rect = new Rect(Point.zero, canvas).outline(32)
  const table = new Table(scene, rect)

  createTable(table)

  table.create()

  const layer = scene.createLayer()
  table.drop = (data, point) => {
    layer.createTextBlock(data, { fontSize: '28px', color: '#005f71' }, point)
    layer.order = 100
  }

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
