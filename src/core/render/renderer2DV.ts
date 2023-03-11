import { Matrix2D } from '../matrix'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'

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
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) this.drawLayer(layer, this.ctx, Matrix2D.identity, false)
    this.drawLayer(scene.actionLayer, this.ctx, Matrix2D.identity, false)
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
