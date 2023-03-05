import { Matrix2D } from '../matrix'
import { IDisposable } from '../../utils/disposable'
import { internal } from '../../utils/internal'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'

type Offscreen = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }
type Layout = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, offscreen: Offscreen, order: number }
interface DynamicLayer { onRemoveLayer: ((layer: Layer) => void) }

export type RendererOptions = { containerClass?: string, wrapperClass?: string, canvasClass?: string }

export class DynamicRenderer2D extends RendererBase implements IDisposable {
  #scene: Scene | null = null
  #container: HTMLDivElement
  #wrapper: HTMLDivElement
  #viewportSize: Size
  private foregroundCanvas: HTMLCanvasElement
  private layouts: Record<string, Layout> = {}
  private actionCanvas: Layout
  private options: RendererOptions
  private resized: boolean = false
  private resizeObserver: ResizeObserver
  private scrollChangedEventListener: (ev: Event) => void
  private forceRedraw: boolean = false
  useOffscreenRendering = true
  onViewportResized: ((size: Size) => void) | null = null
  onScrollChanged: ((size: Size) => void) | null = null

  constructor (viewportSize: Size, options?: RendererOptions) {
    super()
    this.#viewportSize = viewportSize
    this.options = options ?? {}
    this.actionCanvas = this.createLayout(9998)
    this.foregroundCanvas = this.createLayout(9999).canvas
    this.#container = document.createElement('div')
    this.#wrapper = document.createElement('div')
    if (this.options.containerClass) this.#container.className = this.options.containerClass
    !this.options.wrapperClass ? this.#wrapper.style.position = 'relative' : this.#wrapper.className = this.options.wrapperClass
    this.#container.append(this.#wrapper)
    this.#wrapper.append(this.actionCanvas.canvas)
    this.#wrapper.append(this.foregroundCanvas)
    this.scrollChangedEventListener = () => this.scrollChanged()
    this.#container.addEventListener('scroll', () => this.scrollChanged())
    this.resizeObserver = new ResizeObserver(() => this.resizeViewport())
    this.resizeObserver.observe(this.#container)
  }

  render (scene: Scene): void {
    if (!this.#scene) {
      this.#scene = scene
      internal<DynamicLayer>(this.#scene).onRemoveLayer = layer => this.removeLayer(layer)
    }
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (!layer.modified && !this.resized && !this.forceRedraw) continue
      const layout = this.getLayout(layer)

      if (this.useOffscreenRendering) {
        this.drawLayer(layer, layout.offscreen.ctx, this.forceRedraw)
        layout.ctx.drawImage(layout.offscreen.canvas, 0, 0)
        continue
      }

      this.drawLayer(layer, layout.ctx, this.forceRedraw)
    }
    this.drawLayer(scene.actionLayer, this.actionCanvas.ctx, this.forceRedraw)
    this.resized = false
    this.forceRedraw = false
  }

  clear (): void {
    if (!this.#scene) return
    for (const layer of this.#scene.layers) {
      if (!layer.modified && !this.forceRedraw) continue

      const { width, height } = this.viewportSize
      const layout = this.layouts[layer.id]
      if (layout) {
        if (this.useOffscreenRendering) layout.offscreen.ctx.clearRect(0, 0, width, height)
        layout.ctx.clearRect(0, 0, width, height)
      }
    }
  }

  resize ({ width, height }: Size): void {
    this.#viewportSize.width = width
    this.#viewportSize.height = height
    this.changeForegroundSize()
    this.changeLayoutSize(this.actionCanvas)
    for (const id of Object.keys(this.layouts)) this.changeLayoutSize(this.layouts[id])
  }

  get element () {
    return this.#container
  }

  get viewportSize (): Readonly<Size> {
    return this.#viewportSize
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.foregroundCanvas
  }

  private createLayout (order: number, id?: string): Layout {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.create(this.viewportSize)
    const offscreen = CanvasRenderingContext2DFactory.create(this.viewportSize)
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
    layout.canvas.width = this.viewportSize.width
    layout.canvas.height = this.viewportSize.height
    layout.offscreen.canvas.width = this.viewportSize.width
    layout.offscreen.canvas.height = this.viewportSize.height
  }

  private changeForegroundSize (): void {
    this.foregroundCanvas.width = this.viewportSize.width
    this.foregroundCanvas.height = this.viewportSize.height
  }

  private resizeViewport () {
    const size: Size = { width: this.#container.clientWidth, height: this.#container.clientHeight }
    this.resize(size)
    if (!this.onViewportResized) return
    this.onViewportResized(size)
    this.resized = true
  }

  private scrollChanged () {
    this.viewportMatrix = Matrix2D.identity.translate({ x: -Math.round(this.#container.scrollLeft), y: Math.round(this.#container.scrollTop) })
    this.forceRedraw = true
    if (this.onScrollChanged) this.onScrollChanged({ width: Math.round(this.#container.scrollLeft), height: Math.round(this.#container.scrollTop) })
  }

  dispose (): void {
    this.resizeObserver.unobserve(this.#container)
    this.resizeObserver.disconnect()
    this.#wrapper.removeEventListener('scroll', this.scrollChangedEventListener)
  }
}
