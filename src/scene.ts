import { Label } from './label'
import { LabelStyle } from './label-style'
import { Rect } from './rect'
import { Shape } from './shape'

export abstract class Scene {
    readonly ctx: CanvasRenderingContext2D
    readonly bounds: Rect
    readonly layers: Shape[]
    readonly actionLayer: Shape
    readonly labels: Label[]
    dynamicLabels: Label[]

    constructor (canvas: HTMLCanvasElement) {
      this.ctx = canvas.getContext('2d')
      this.bounds = { x: 0, y: 0, width: canvas.width, height: canvas.height }
      this.layers = []
      this.labels = []
      this.dynamicLabels = []
      this.actionLayer = this.createLayer(false)
    }

    createLayer (add:boolean = true): Shape {
      const result = {
        path: new Path2D(),
        style: {}
      } as Shape

      if (add) {
        this.layers.push(result)
      }

      return result
    }

    render (): void {
      for (const layer of this.layers) {
        this.drawLayer(layer)
      }

      this.drawLayer(this.actionLayer)

      for (const label of this.labels) {
        this.drawLabel(label)
      }

      for (const label of this.dynamicLabels) {
        this.drawLabel(label)
      }
    }

    protected drawLayer (layer: Shape): void {
      if (layer.style.strokeStyle) {
        this.ctx.strokeStyle = layer.style.strokeStyle
        this.ctx.lineWidth = layer.style.lineWidth
        this.ctx.stroke(layer.path)
      }
      if (layer.style.fillStyle) {
        this.ctx.fillStyle = layer.style.fillStyle
        this.ctx.fill(layer.path)
      }
    }

    protected drawLabel (label: Label) {
      const style: LabelStyle = label.style || {}
      this.ctx.fillStyle = style.color || '#000'
      const fontName = style.fontName || 'serif'
      const fontSize = style.fontSize || '10pt'
      this.ctx.font = `${fontSize} ${fontName}`
      const width = this.ctx.measureText(label.text).width
      const x = label.x(width)
      const y = label.y(width)
      this.ctx.fillText(label.text, x, y)
    }
}
