import { createAxis, createBackground, createGrid, createThresholds, createTooltipWindow, createCorner } from './bg-templates'
import { ChartBase } from './chart-base'
import colors from './colors'
import { LabelStyle } from './label-style'
import { getDateFormat, getMax, roundInt } from './utils'
import { Point } from './point'
import { Viewport } from './viewport'

interface Item {
  Time: Date
  Value: number
}

export function linearChart (canvas: HTMLCanvasElement, items: Item[]): void {
  const chart = new ChartBase(canvas)
  chart.maxWidth = items.length
  chart.maxHeight = roundInt(getMax(items))
  chart.legend.chartName = 'График расхода топлива'
  chart.legend.yTitle = 'Топливо (л.): '
  chart.legend.xTitle = 'Время: '
  chart.padding = { top: 25, left: 50, bottom: 70, right: 50 }
  addBackground(chart)
  addGraph(chart, items, colors.graphColor, 2)
  // addGraph(chart, items, colors.activeLineColor, 4, p => {
  //   const date = p.Time
  //   return date >= dateFrom && date <= dateTo
  // })
  addNumbers(chart, items)
  chart.addEventListener('move', e => onMove(chart, items, e))
  chart.render()
}

function addBackground (chart: ChartBase) {
  const backgroundLayer = chart.createLayer()
  const viewport = new Viewport(chart.bounds, chart.padding)
  backgroundLayer.addShape(createBackground(colors.backgroundColor, chart.bounds))
  const point = chart.delta
  const thresholdLayer = chart.createLayer()
  createThresholds(thresholdLayer, 'y', [
    { value: chart.getPoint(0, 140).y, color: 'rgb(171,214,216)' },
    { value: chart.getPoint(0, 80).y, color: 'rgb(111,84,122)' },
    { value: chart.getPoint(0, 20).y, color: 'rgb(231,232,232)' }
  ], chart.bounds, chart.padding)
  backgroundLayer.createText({
    text: chart.legend.chartName,
    x: _ => (chart.bounds.width / 2) - (_ / 2),
    y: _ => chart.bounds.height - 16,
    style: { strokeStyle: '#333', fontSize: '12pt' } as LabelStyle
  })
  const backgroundLayer2 = chart.createLayer()
  backgroundLayer2.addShape(createGrid({ bounds: viewport, seed: { width: point.x, height: point.y * 10 } }))
  backgroundLayer2.addShape(createAxis(chart.bounds, chart.padding))
}

function addGraph (chart: ChartBase, items: Item[], color: string, width: number, callback?: (p: Item) => boolean): void {
  const shape = chart.createLayer().createShape()
  shape.style.strokeStyle = color
  shape.style.lineWidth = width
  let i = 0
  for (const item of items) {
    const p = chart.getPoint(i++, item.Value)
    if (callback && callback(item) === false) {
      shape.moveTo(p)
      continue
    }

    shape.lineTo(p)
    shape.moveTo(p)
  }
}

function addNumbers (chart: ChartBase, items: Item[]): void {
  const layer = chart.createLayer()
  const viewport = new Viewport(chart.bounds, chart.padding)
  const style: LabelStyle = { color: colors.lineColor }
  const shape = layer.createShape()
  shape.style.strokeStyle = colors.lineColor
  layer.createText({
    text: '0',
    x: _ => viewport.x - 28,
    y: _ => viewport.bottom + 8,
    style
  })
  const n = 10
  const dy = chart.maxHeight / n
  for (let i = 1; i <= n; i++) {
    layer.createText({
      text: (dy * i).toFixed(0),
      x: _ => viewport.x - 28,
      y: _ => chart.getPoint(0, dy * i).y,
      style
    })
    shape.lineH({ x: viewport.x - 5, y: chart.getPoint(0, dy * i).y }, 5)
  }
  const dx = Math.floor(chart.maxWidth / n)
  for (let i = 1; i <= n + 1; i++) {
    const item = items[dx * i]
    if (!item) continue
    layer.createText({
      text: getDateFormat(item.Time, 'hh:mm'),
      x: width => chart.getPoint(dx * i, 0).x - (width / 2),
      y: _ => viewport.bottom + 26,
      style
    })
    shape.lineV({ x: chart.getPoint(dx * i, 0).x, y: viewport.bottom }, 5)
  }
}

function onMove (chart: ChartBase, items: Item[], e: Point) {
  const viewport = new Viewport(chart.bounds, chart.padding)
  if (!viewport.hitTest(e)) {
    return
  }

  const layer = chart.actionLayer
  const index = Math.floor(((e.x - chart.padding.left) / chart.delta.x))
  const item = items[index]
  const point = chart.getPoint(index, item.Value)
  createCorner(layer, point, viewport.x, viewport.bottom)
  const xText = chart.legend.xTitle + getDateFormat(item.Time, 'hh:mm:ss')
  const yText = chart.legend.yTitle + item.Value.toFixed(2).toString()
  createTooltipWindow(layer, point, viewport, [xText, yText])
}
