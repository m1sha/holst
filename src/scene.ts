import { Label } from './label'
import { LabelStyle } from './label-style'
import { Rect } from './rect'
import { Shape } from './shape'

export type LabelType = 'static' | 'action'
export abstract class Scene {
    readonly ctx: CanvasRenderingContext2D
    readonly bounds: Rect
    readonly shapes: Shape[]
    readonly actionLayer: Shape // TODO actionLayer: need to create class Layer that will be contain array of shapes
    private readonly labels: Label[]
    private actionLabels: Label[]

    constructor (canvas: HTMLCanvasElement) {
      this.ctx = canvas.getContext('2d')
      this.bounds = { x: 0, y: 0, width: canvas.width, height: canvas.height }
      this.shapes = []
      this.labels = []
      this.actionLabels = []
      this.actionLayer = this.createShape(false)
    }

    createShape (add:boolean = true): Shape {
      const result = {
        path: new Path2D(),
        style: {}
      } as Shape

      if (add) {
        this.shapes.push(result)
      }

      return result
    }

    addLabel (label: Label, labelType: LabelType): void {
      switch (labelType) {
        case 'action':
          this.actionLabels.push(label)
          break
        case 'static':
          this.labels.push(label)
          break
      }
    }

    render (): void {
      for (const layer of this.shapes) {
        this.drawShape(layer)
      }

      this.drawShape(this.actionLayer)

      for (const label of this.labels) {
        this.drawLabel(label)
      }

      for (const label of this.actionLabels) {
        this.drawLabel(label)
      }
    }

    freeDynamic () {
      this.actionLayer.path = new Path2D()
      this.actionLabels = []
    }

    private drawShape (shape: Shape): void {
      if (shape.style.strokeStyle) {
        this.ctx.strokeStyle = shape.style.strokeStyle
        this.ctx.lineWidth = shape.style.lineWidth
        this.ctx.stroke(shape.path)
      }
      if (shape.style.fillStyle) {
        this.ctx.fillStyle = shape.style.fillStyle
        this.ctx.fill(shape.path)
      }
    }

    private drawLabel (label: Label) {
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
