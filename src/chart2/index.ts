import { ChartOptions } from '../chart/chart-options'
import { Layer } from '../core/layers'
import { Scene } from '../core/scene'
import { padding, point, rect } from '../core/utils'
import { LinearChartBuilder } from './linear-chart-builder'
import { getMax, getMin, getRatio, roundInt } from './utils'

export function createLinearChart (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  const builder = new LinearChartBuilder(canvas, data, options)
  builder.chart.addGraphLayer()
  builder.chart.addAxisesLayer()
  return () => builder.build()
}

export function createLinearChart2 (canvas: HTMLCanvasElement, data: [], options: ChartOptions) {
  const builder = new LinearChartBuilder(canvas, data, options)
  builder.chart.addGraphLayer()
  const layer = builder.chart.createLayer()
  const shape0 = layer.createShape()
  shape0.rect(rect(0, 0, layer.size.width, layer.size.height))
  shape0.rect(rect(5, 5, layer.size.width - 5, layer.size.height - 10))
  shape0.style.strokeStyle = '#151219'
  const shape = layer.createShape()
  shape.rect(rect(0, 0, 10, 10))
  shape.rect(rect(0, layer.size.height - 10, 10, 10))
  shape.rect(rect(layer.size.width - 10, layer.size.height - 10, 10, 10))
  shape.style.strokeStyle = '#552299'
  return () => builder.build()
}

export function createLinearChart3 (canvas: HTMLCanvasElement, data: []) {
  const scene = new Scene(canvas)
  const layer0 = scene.createLayer()
  outer(layer0)

  const layer = scene.createLayer('bottom-left')
  layer.setPadding(padding(30, 20, 25, 10))

  const frame = layer.createShape()
  frame.style.strokeStyle = '#151616'
  frame.style.lineDashOffset = 5
  frame.style.lineDash = [4, 4]
  // frame.rect(rect(0, 0, layer.size.width, layer.size.height))

  const graph = layer.createShape()
  graph.style.strokeStyle = '#556666'
  const points = []

  const maxX = data.length
  const maxY = roundInt(getMax(data, 'Value'))
  const minX = 0
  const minY = roundInt(getMin(data, 'Value'))
  const d = getRatio(minX, minY, maxX, maxY, layer.bounds)

  let i = 0
  for (const item of data) {
    let value = (item as any).Value
    value = value < 0 ? Math.abs(minY) - Math.abs(value) : value + Math.abs(minY)
    points.push({ x: i++ * d.x, y: value * d.y })
  }
  graph.polyline(points)

  const coordinateCross = layer.createShape()
  coordinateCross.style.strokeStyle = '#028f5f'
  coordinateCross.lineH({ x: 0, y: Math.abs(minY) * d.y }, layer.size.width)
  coordinateCross.lineV({ x: 0, y: 0 }, (Math.abs(maxY) + Math.abs(minY)) * d.y)

  const textStyle = { color: '#222222', fontSize: '12px', fontName: 'Arial' }
  const text = { value: '0', x: () => -15, y: () => Math.abs(minY) * d.y, style: textStyle }
  layer.createText(text)

  const yy = Math.abs(maxY) / 5
  for (let i = 1; i <= 5; i++) {
    const text = { value: (i * yy).toString(), x: () => -25, y: () => (Math.abs(i * yy) + Math.abs(minY)) * d.y, style: textStyle }
    layer.createText(text)
  }

  const dashY = layer.createShape()
  dashY.style.strokeStyle = '#a7d7d7'
  for (let i = 1; i <= 5; i++) {
    const y = (Math.abs(i * yy) + Math.abs(minY)) * d.y
    dashY.lineH(point(-5, y), layer.size.width)
  }

  for (let i = 1; i <= 5; i++) {
    const text = { value: (i * yy * -1).toString(), x: () => -25, y: () => (Math.abs(minY) - Math.abs(i * yy)) * d.y, style: textStyle }
    layer.createText(text)
  }

  for (let i = 1; i <= 5; i++) {
    const y = (Math.abs(minY) - Math.abs(i * yy)) * d.y
    dashY.lineH(point(-5, y), layer.size.width)
  }

  const xx = Math.abs(maxX) / 5
  for (let i = 1; i <= 5; i++) {
    const x = Math.abs(i * xx) * d.x
    dashY.lineV(point(x, 0), layer.size.height)
  }

  // dashY.lineH(point(0, 0), layer.size.width)

  scene.render()
}

function outer (layer: Layer) {
  const size = 10
  const topLeft = layer.createShape()
  topLeft.style.strokeStyle = '#222'
  topLeft.style.fillStyle = '#dadada'
  topLeft.rect(rect(0, 0, size, size))

  const topRight = layer.createShape()
  topRight.style.strokeStyle = '#333'
  topRight.style.fillStyle = '#9f9f9f'
  topRight.rect(rect(layer.size.width - size, 0, layer.size.width, size))

  const bottomLeft = layer.createShape()
  bottomLeft.style.strokeStyle = '#333'
  bottomLeft.style.fillStyle = '#9f9f9f'
  bottomLeft.rect(rect(0, layer.size.height - size, size, layer.size.height))

  const bottomRight = layer.createShape()
  bottomRight.style.strokeStyle = '#333'
  bottomRight.style.fillStyle = '#9f9f9f'
  bottomRight.rect(rect(layer.size.width - size, layer.size.height - size, layer.size.width, layer.size.height))

  const frame = layer.createShape()
  frame.style.strokeStyle = '#333'
  frame.rect(rect(0, 0, layer.size.width, layer.size.height))
}
