import { Layer } from '../layers'
import { Scene } from '../scene'
import { Viewport } from '../viewport'
import { RendererBase } from './renderer'

export class Renderer2D extends RendererBase {
  readonly ctx: CanvasRenderingContext2D
  readonly viewport: Viewport

  constructor (ctx: CanvasRenderingContext2D) {
    super()
    this.ctx = ctx
    this.ctx.imageSmoothingEnabled = true
    this.viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  render (scene: Scene): void {
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) this.drawLayer(layer, this.ctx)
    this.drawLayer(scene.actionLayer, this.ctx)
  }

  clear (): void {
    const { width, height } = this.viewport
    this.ctx.clearRect(0, 0, width, height)
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.ctx.canvas
  }
}
