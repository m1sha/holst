import { drawAxis, drawBackground, drawGrid } from './layers'
import { Chart } from './chart'
import colors from './colors'
import { EventHandler } from './event-handler'
import { LabelStyle } from './label-style'
import { getDateFormat, getMax } from './utils'
import { Point } from './point'

interface Item {
  Time: string
  Value: number
}

export function linearChart (canvas: HTMLCanvasElement, items: Item[], { countTo, countFrom, dateFrom, dateTo }): void {
  const chart = new Chart(canvas)
  chart.maxWidth = items.length
  chart.maxHeight = getMax(items)
  chart.padding = { top: 25, left: 50, bottom: 30, right: 50 }
  chart.shapes.push(drawBackground(colors.backgroundColor, chart.bounds))
  chart.shapes.push(drawGrid({ bounds: chart.bounds, seed: { width: 40, height: 40 } }))
  chart.shapes.push(drawAxis(chart.bounds, chart.padding))
  drawGraph(chart, items, colors.graphColor, 2)
  drawGraph(chart, items, colors.activeLineColor, 4, p => {
    const date = new Date(p.Time)
    return date >= dateFrom && date <= dateTo
  })
  drawNumbers(chart, items)

  const handler = new EventHandler(chart)
  handler.on = (et, e) => {
    if (et !== 'move') {
      return
    }

    onMove(chart, items, e)
  }

  chart.render()
}

function drawGraph (chart: Chart, items: Item[], color: string, width: number, callback?: (p: Item) => boolean): void {
  const shape = chart.createShape()
  shape.style.strokeStyle = color
  shape.style.lineWidth = width
  let i = 0
  for (const item of items) {
    const p = chart.getPoint(i++, item.Value)
    if (callback && callback(item) === false) {
      shape.path.moveTo(p.x, p.y)
      continue
    }

    shape.path.lineTo(p.x, p.y)
    shape.path.moveTo(p.x, p.y)
  }
}

function drawNumbers (chart: Chart, items: Item[]): void {
  const style: LabelStyle = { color: colors.lineColor }
  chart.addLabel({
    text: 0.0.toFixed(2).toString(),
    x: width => chart.padding.left - width - 8,
    y: _ => chart.bounds.height - chart.getPoint(0, chart.maxHeight).y,
    style
  }, 'static')
  const n = 8
  const dy = chart.maxHeight / n
  for (let i = 1; i <= n; i++) {
    chart.addLabel({
      text: (dy * i).toFixed(2),
      x: width => chart.padding.left - width - 8,
      y: _ => chart.getPoint(0, dy * i).y,
      style
    }, 'static')
  }
  const dx = Math.floor(chart.maxWidth / n)
  for (let i = 1; i <= n; i++) {
    const item = items[dx * i]
    if (!item) continue
    chart.addLabel({
      text: getDateFormat(new Date(item.Time), 'time'),
      x: width => chart.getPoint(dx * i, 0).x - (width / 2),
      y: _ => chart.bounds.height - chart.padding.bottom + 26,
      style
    }, 'static')
  }
}

function onMove (chart: Chart, items: Item[], e: Point) {
  const isInSector = e.x >= chart.padding.left && e.x <= chart.bounds.width - chart.padding.right
  if (!isInSector) {
    return
  }

  const style: LabelStyle = { color: colors.selectLineColor, fontSize: '11pt' }
  const layer = chart.actionLayer
  layer.style.strokeStyle = colors.selectLineColor
  layer.style.lineWidth = 2
  const y0 = chart.padding.top
  const y1 = chart.bounds.height - chart.padding.bottom
  layer.path.moveTo(e.x, y0)
  layer.path.lineTo(e.x, y1)
  const xValue = Math.floor(((e.x - chart.padding.left) / chart.delta.x))
  const item = items[xValue]
  const xLabel = getDateFormat(new Date(item.Time), 'time')
  chart.addLabel({ text: xLabel, x: p => e.x - (p / 2), y: _ => y1 + 15, style }, 'action')
  const yN = chart.getPoint(0, item.Value).y
  layer.path.moveTo(e.x, yN)
  layer.path.lineTo(chart.bounds.x + chart.padding.left, yN)
  chart.addLabel({ text: item.Value.toFixed(2).toString(), x: p => chart.bounds.x + chart.padding.left + (p / 2), y: _ => yN + 15, style }, 'action')
}
