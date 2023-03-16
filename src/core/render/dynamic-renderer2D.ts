import { IDisposable } from '../../utils/disposable'
import { internal } from '../../utils/internal'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'
import { IViewport, Viewport } from '../viewport'

type Offscreen = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }
type Layout = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, offscreen: Offscreen, order: number }
interface DynamicLayer { onRemoveLayer: ((layer: Layer) => void) }

export type RendererOptions = { containerClass?: string, wrapperClass?: string, canvasClass?: string }

export class DynamicRenderer2D extends RendererBase implements IDisposable {
  #scene: Scene | null = null
  #container: HTMLDivElement
  #wrapper: HTMLDivElement
  private foregroundCanvas: HTMLCanvasElement
  private layouts: Record<string, Layout> = {}
  private actionCanvas: Layout
  private options: RendererOptions
  private resized: boolean = false
  private forceRedraw: boolean = false
  #viewport: IViewport
  useOffscreenRendering = true

  constructor (viewportSize: Size, options?: RendererOptions) {
    super()
    this.options = options ?? {}
    this.#container = document.createElement('div')
    this.#wrapper = document.createElement('div')
    this.#viewport = internal<IViewport>(new Viewport(viewportSize, this.#container, this.#wrapper,
      () => {
        if (!this.options.containerClass) return
        this.resize()
        this.resized = true
      },
      () => {
        this.forceRedraw = true
      }
    ))
    this.actionCanvas = this.createLayout(9998)
    this.foregroundCanvas = this.createLayout(9999).canvas
    if (this.options.containerClass) this.#container.className = this.options.containerClass
    !this.options.wrapperClass ? this.#wrapper.style.position = 'relative' : this.#wrapper.className = this.options.wrapperClass
    this.#container.append(this.#wrapper)
    this.#wrapper.append(this.actionCanvas.canvas)
    this.#wrapper.append(this.foregroundCanvas)
  }

  render (scene: Scene): void {
    if (!this.#scene) {
      this.#scene = scene
      internal<DynamicLayer>(this.#scene).onRemoveLayer = layer => this.removeLayer(layer)
    }
    super.render(scene)
    if (this.options.wrapperClass) {
      const size = this.#scene!.size
      this.#viewport.updateSpaceSize(size)
    }

    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (!layer.modified && !this.resized && !this.forceRedraw) continue
      const layout = this.getLayout(layer)

      if (this.useOffscreenRendering) {
        this.drawLayer(layer, layout.offscreen.ctx, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw)
        layout.ctx.drawImage(layout.offscreen.canvas, 0, 0)
        continue
      }

      this.drawLayer(layer, layout.ctx, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw)
    }
    this.drawLayer(scene.actionLayer, this.actionCanvas.ctx, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw)
    this.resized = false
    this.forceRedraw = false
  }

  clear (): void {
    if (!this.#scene) return
    for (const layer of this.#scene.layers) {
      if (!layer.modified && !this.forceRedraw) continue

      const { width, height } = this.#viewport.size
      const layout = this.layouts[layer.id]
      if (layout) {
        if (this.useOffscreenRendering) layout.offscreen.ctx.clearRect(0, 0, width, height)
        layout.ctx.clearRect(0, 0, width, height)
      }
    }
  }

  resize (): void {
    this.changeForegroundSize()
    this.changeLayoutSize(this.actionCanvas)
    for (const id of Object.keys(this.layouts)) this.changeLayoutSize(this.layouts[id])
  }

  get element () {
    return this.#container
  }

  get viewport (): Viewport {
    return internal<Viewport>(this.#viewport)
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.foregroundCanvas
  }

  private createLayout (order: number, id?: string): Layout {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(this.#viewport.size)
    const offscreen = CanvasRenderingContext2DFactory.create(this.#viewport.size)
    !this.options.canvasClass ? canvas.style.position = 'absolute' : canvas.className = this.options.canvasClass
    canvas.style.zIndex = order.toString()
    if (id) canvas.classList.add(id)
    return { canvas, ctx, offscreen, order }
  }

  private getLayout ({ id, order }: Layer): Layout {
    let layout = this.layouts[id]
    if (layout) {
      if (layout.order !== order) layout.canvas.style.zIndex = order.toString()
      return layout
    }

    layout = this.createLayout(order, id)
    this.layouts[id] = layout
    this.#wrapper.append(layout.canvas)
    if (layout.order !== order) layout.canvas.style.zIndex = order.toString()
    return layout
  }

  private removeLayer ({ id }: Layer): void {
    const elem = this.#wrapper.getElementsByClassName(id)[0]
    if (elem) this.#wrapper.removeChild(elem)
  }

  private changeLayoutSize (layout: Layout): void {
    const { width, height } = this.#viewport.size
    layout.canvas.width = width
    layout.canvas.height = height
    layout.offscreen.canvas.width = width
    layout.offscreen.canvas.height = height
  }

  private changeForegroundSize (): void {
    this.foregroundCanvas.width = this.#viewport.size.width
    this.foregroundCanvas.height = this.#viewport.size.height
  }

  dispose (): void {
    this.#viewport.dispose()
  }
}
