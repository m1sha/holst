import { LineChartBuilder } from '../chart/line-chart-builder'
import { Constraints } from '../core/constraints'
import { TextStyle } from '../core/label-style'
import { Layer } from '../core/layers'
import { padding, point } from '../core/utils'

export class LineChartBuilder3 extends LineChartBuilder {
  constraints: Constraints
  textStyle: TextStyle

  addGraphLayer (): this | LineChartBuilder3 {
    const layer = this.createLayer()
    const d = layer.ratio
    const graph = layer.createShape()
    graph.style.strokeStyle = '#556666'
    graph.style.lineWidth = 3
    graph.style.lineJoin = 'bevel'
    const points = []
    let i = 0
    for (const item of this.data) {
      let value = (item as any).Value
      value = value < 0 ? Math.abs(this.constraints.minY) - Math.abs(value) : value + Math.abs(this.constraints.minY)
      points.push({ x: i++ * d.x, y: value * d.y })
    }
    graph.polyline(points)

    return this
  }

  addAxisesLayer (): this | LineChartBuilder {
    const layer = this.createLayer()
    const d = layer.ratio
    const constraints = this.constraints
    const coordinateCross = layer.createShape()
    coordinateCross.style.strokeStyle = '#028f5f'
    coordinateCross.lineH({ x: 0, y: Math.abs(this.constraints.minY) * d.y }, layer.size.width)
    coordinateCross.lineV({ x: 0, y: 0 }, (Math.abs(this.constraints.maxY) + Math.abs(this.constraints.minY)) * d.y)
    const yy = Math.abs(this.constraints.maxY) / 5
    const dashY = layer.createShape()
    dashY.style.strokeStyle = '#a7d7d7'
    for (let i = 1; i <= 5; i++) {
      const y = (Math.abs(i * yy) + Math.abs(this.constraints.minY)) * d.y
      dashY.lineH(point(-5, y), layer.size.width + 5)
    }
    for (let i = 1; i <= 5; i++) {
      if (Math.abs(constraints.minY) < Math.abs(i * yy)) break
      const y = (Math.abs(constraints.minY) - Math.abs(i * yy)) * d.y
      dashY.lineH(point(-5, y), layer.size.width)
    }

    const xx = Math.abs(constraints.maxX) / 8
    for (let i = 1; i <= 8; i++) {
      const x = Math.abs(i * xx) * d.x
      dashY.lineV(point(x, 0), layer.size.height)
    }
    return this
  }

  addNumbers (): this | LineChartBuilder {
    const layer = this.createLayer()
    const d = layer.ratio
    const constraints = this.constraints

    const text = { value: '0', x: () => -15, y: () => Math.abs(this.constraints.minY) * d.y, style: this.textStyle }
    layer.createText(text)

    const yy = Math.abs(constraints.maxY) / 5
    for (let i = 1; i <= 5; i++) {
      const y = (Math.abs(i * yy) + Math.abs(constraints.minY)) * d.y
      const text = { value: (i * yy).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
      layer.createText(text)
    }

    for (let i = 1; i <= 5; i++) {
      if (Math.abs(constraints.minY) < Math.abs(i * yy)) break
      const y = (Math.abs(constraints.minY) - Math.abs(i * yy)) * d.y
      const text = { value: (i * yy * -1).toString(), x: w => -w - 10, y: () => y, style: this.textStyle }
      layer.createText(text)
    }

    const xx = Math.abs(constraints.maxX) / 8
    for (let i = 1; i <= 8; i++) {
      const item = this.data[parseInt((i * xx).toString())]
      if (!item) continue
      const { xValue } = this.getDisplayValues(item)
      const text = {
        value: xValue.toString(),
        x: w => Math.abs(i * xx) * d.x - (w / 2),
        y: () => Math.abs(this.constraints.minY) * d.y - 20,
        style: this.textStyle
      }
      layer.createText(text)
    }

    return this
  }

  private createLayer () {
    const layer = this.chart.createLayer('bottom-left')
    this.setPadding(layer)
    layer.constraints = this.constraints
    return layer
  }

  private setPadding (layer: Layer): void {
    const paddingLeft = layer.measureText(this.constraints.maxY.toString(), this.textStyle).width + 20
    layer.setPadding(padding(65, paddingLeft, 25, 30))
  }
}
