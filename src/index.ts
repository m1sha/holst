import { ChartBase } from './chart-base'

export function createChart (canvas: HTMLCanvasElement) {
  const chart = new ChartBase(canvas)
  return () => chart.render()
}
