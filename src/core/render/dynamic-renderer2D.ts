import { internal } from '../../utils/internal'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'

type Layout = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, order: number }
interface DynamicLayer { onRemoveLayer: ((layer: Layer) => void) }

export class DynamicRenderer2D extends RendererBase {
  #scene: Scene | null = null
  #element: HTMLDivElement
  private foregroundCanvas: HTMLCanvasElement
  private layouts: Record<string, Layout> = {}
  private actionCanvas: Layout
  readonly viewportSize: Size

  constructor (viewportSize: Size) {
    super()
    this.viewportSize = viewportSize
    this.#element = document.createElement('div')
    this.#element.style.position = 'relative'
    this.actionCanvas = this.createCanvas(9998)
    this.foregroundCanvas = this.createCanvas(9999).canvas
    this.#element.append(this.actionCanvas.canvas)
    this.#element.append(this.foregroundCanvas)
  }

  render (scene: Scene): void {
    if (!this.#scene) {
      this.#scene = scene
      internal<DynamicLayer>(this.#scene).onRemoveLayer = layer => this.removeLayer(layer)
    }
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (!layer.modified) continue
      const ctx = this.getContext(layer)
      this.drawLayer(layer, ctx)
    }
    this.drawLayer(scene.actionLayer, this.actionCanvas.ctx)
  }

  clear (): void {
    if (!this.#scene) return
    for (const layer of this.#scene.layers) {
      if (!layer.modified) continue

      const { width, height } = this.viewportSize
      const layout = this.layouts[layer.id]
      if (layout) layout.ctx.clearRect(0, 0, width, height)
    }
  }

  get element () {
    return this.#element
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.foregroundCanvas
  }

  private createCanvas (order: number, id?: string) {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(this.viewportSize)
    canvas.style.position = 'absolute'
    canvas.style.zIndex = order.toString()
    if (id) canvas.className = id
    return { canvas, ctx, order }
  }

  private getContext ({ id, order }: Layer) {
    let layout = this.layouts[id]
    if (layout) {
      if (layout.order !== order) layout.canvas.style.zIndex = order.toString()
      return layout.ctx
    }

    layout = this.createCanvas(order, id)
    this.layouts[id] = layout
    this.#element.append(layout.canvas)
    if (layout.order !== order) layout.canvas.style.zIndex = order.toString()
    return layout.ctx
  }

  private removeLayer ({ id }: Layer) {
    const elem = this.#element.getElementsByClassName(id)[0]
    if (elem) this.#element.removeChild(elem)
  }
}
