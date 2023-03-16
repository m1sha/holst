import { Matrix2D } from '../matrix'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'
import { Rect } from '../geometry/rect'

export class Renderer2DV extends RendererBase {
  readonly ctx: CanvasRenderingContext2D

  constructor (size: Size) {
    super()
    const { ctx } = CanvasRenderingContext2DFactory.create(size)
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
  }

  render (scene: Scene): void {
    super.render(scene)
    const { width, height } = this.getCanvas()
    const rect = new Rect(0, 0, width, height)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) this.drawLayer(layer, this.ctx, Matrix2D.identity, rect, false)
    this.drawLayer(scene.actionLayer, this.ctx, Matrix2D.identity, rect, false)
  }

  clear (): void {
    const { width, height } = this.getCanvas()
    this.ctx.clearRect(0, 0, width, height)
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.ctx.canvas
  }

  get element () {
    return this.ctx.canvas
  }
}
