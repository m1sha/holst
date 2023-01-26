import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'

export class MultiCanvasRenderer extends RendererBase {
  #scene: Scene | null = null
  #element: HTMLDivElement
  private backgroundCanvas: HTMLCanvasElement
  private canvases: Record<string, { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }> = {}
  readonly viewportSize: Size

  constructor (viewportSize: Size) {
    super()
    this.viewportSize = viewportSize
    this.backgroundCanvas = this.createCanvas(0).canvas
    this.#element = document.createElement('div')
    this.#element.className = 'wrapper'
    this.#element.append(this.backgroundCanvas)
  }

  render (scene: Scene): void {
    this.#scene = scene
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (!layer.modified) continue
      const ctx = this.getContext(layer)
      this.drawLayer(layer, ctx)
    }
    // this.drawLayer(scene.actionLayer, this.ctx)
  }

  clear (): void {
    if (!this.#scene) return
    for (const layer of this.#scene.layers) {
      if (!layer.modified) continue

      const { width, height } = this.viewportSize
      this.canvases[layer.id].ctx.clearRect(0, 0, width, height)
    }
  }

  get element () {
    return this.#element
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.backgroundCanvas
  }

  private createCanvas (index: number) {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(this.viewportSize)
    canvas.style.zIndex = index.toString()
    return { canvas, ctx }
  }

  private getContext ({ id, order }: Layer) {
    let item = this.canvases[id]
    if (item) return item.ctx
    item = this.createCanvas(order)
    this.canvases[id] = item
    this.#element.append(item.canvas)
    return item.ctx
  }
}
