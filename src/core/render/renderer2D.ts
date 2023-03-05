import { Layer } from '../layers'
import { Scene } from '../scene'
import { RendererBase } from './renderer'

export class Renderer2D extends RendererBase {
  readonly ctx: CanvasRenderingContext2D

  constructor (ctx: CanvasRenderingContext2D) {
    super()
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
  }

  render (scene: Scene): void {
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) this.drawLayer(layer, this.ctx, false)
    this.drawLayer(scene.actionLayer, this.ctx, false)
  }

  clear (): void {
    const { width, height } = this.viewport
    this.ctx.clearRect(0, 0, width, height)
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.ctx.canvas
  }
}
