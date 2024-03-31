import { IDisposable } from '../../utils/disposable'
import { internal } from '../../utils/internal'
import { Size } from '../geometry/size'
import { Layer } from '../layers'
import { Scene } from '../scene'
import CanvasRenderingContext2DFactory from './canvas-rendering-context-2d-factory'
import { RendererBase } from './renderer'
import { IViewport, Viewport } from '../viewport'

// type Offscreen = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }
// type Layout = { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, offscreen: Offscreen, order: number }
type Offscreen = { canvas: OffscreenCanvas, ctx: OffscreenCanvasRenderingContext2D }
type Layout = { canvas: HTMLCanvasElement, ctx: ImageBitmapRenderingContext, offscreen: Offscreen, order: number }
interface DynamicLayer { onRemoveLayer: ((layer: Layer) => void) }

export type RendererOptions = { containerClass?: string, wrapperClass?: string, canvasClass?: string, disableInteractive?: boolean, maxZIndex?: number }

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

    const zIndex = this.options.maxZIndex ?? 9999
    this.actionCanvas = this.createLayout(zIndex - 1)
    this.foregroundCanvas = this.createLayout(zIndex).canvas
    if (this.options.containerClass) this.#container.className = this.options.containerClass
    !this.options.wrapperClass ? this.#wrapper.style.position = 'relative' : this.#wrapper.className = this.options.wrapperClass
    this.#container.append(this.#wrapper)
    if (!this.options.disableInteractive) this.#wrapper.append(this.actionCanvas.canvas)
    if (!this.options.disableInteractive) this.#wrapper.append(this.foregroundCanvas)
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
      if (!layer.modified && !this.resized && !this.forceRedraw && !layer.needRedraw) continue
      const layout = this.getLayout(layer)

      if (this.useOffscreenRendering) {
        (layer as any).onHidden = () => this.setLayoutVisible(layer)
        if (layer.hidden) continue
        this.drawLayer(layer, layout.offscreen.ctx as any, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw)
        // layout.ctx.drawImage(layout.offscreen.canvas, 0, 0)
        layout.ctx.transferFromImageBitmap(layout.offscreen.canvas.transferToImageBitmap())
        layer.needRedraw = false
        continue
      }

      // this.drawLayer(layer, layout.ctx, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw)
    }
    for (const layer of scene.htmlLayers) {
      if (!layer.modified && !this.resized && !this.forceRedraw) continue
      // const layout = this.getLayout(layer)
      let container = this.#wrapper
      if (layer.useContainer) {
        const oldContainer = this.#wrapper.getElementsByClassName(layer.id)[0]
        if (oldContainer) {
          layer.elements.forEach(el => {
            if (oldContainer.getElementsByClassName(el.id)[0]) return
            oldContainer.append(el.htmlElement)
          })
          continue
        }
        container = document.createElement(layer.containerElement) as HTMLDivElement
        container.style.position = 'absolute'
        container.classList.add(layer.id)
        this.#wrapper.append(container)
      }
      layer.elements.forEach(el => {
        if (this.#wrapper.getElementsByClassName(el.id)[0]) return
        container.append(el.htmlElement)
      })
    }
    this.drawLayer(scene.actionLayer, this.actionCanvas.offscreen.ctx as any, this.#viewport.viewportMatrix, this.#viewport.bounds, this.forceRedraw, this.dpr)
    this.actionCanvas.ctx.transferFromImageBitmap(this.actionCanvas.offscreen.canvas.transferToImageBitmap())
    this.resized = false
    this.forceRedraw = false
  }

  clear (): void {
    if (!this.#scene) return
    const { width, height } = this.#viewport.size
    if (this.useOffscreenRendering) this.actionCanvas.offscreen.ctx.clearRect(0, 0, width, height)
    // this.actionCanvas.ctx.clearRect(0, 0, width, height)
    for (const layer of this.#scene.layers) {
      if (!layer.modified && !this.forceRedraw) continue

      const layout = this.layouts[layer.id]
      if (layout) {
        if (this.useOffscreenRendering) layout.offscreen.ctx.clearRect(0, 0, width, height)
        // layout.ctx.clearRect(0, 0, width, height)
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

  get dpr () {
    return window.devicePixelRatio
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.foregroundCanvas
  }

  private createLayout (order: number, id?: string): Layout {
    const { canvas, ctx } = CanvasRenderingContext2DFactory.createBitmap(this.#viewport.size, this.dpr)
    const offscreen = CanvasRenderingContext2DFactory.createOffscreen(this.#viewport.size, this.dpr)
    !this.options.canvasClass ? canvas.style.position = 'absolute' : canvas.className = this.options.canvasClass
    canvas.style.zIndex = order.toString()
    if (id) canvas.classList.add(id)
    return { canvas, ctx, offscreen, order }
  }

  private getLayout ({ id, order, size }: Layer): Layout {
    let layout = this.layouts[id]
    if (layout) {
      if (layout.order !== order) layout.canvas.style.zIndex = order.toString()
      if (layout.canvas.width !== size.width || layout.canvas.height !== size.height) {
        layout.canvas.width = size.width
        layout.canvas.height = size.height
        layout.offscreen.canvas.width = size.width
        layout.offscreen.canvas.height = size.height
      }
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

  private setLayoutVisible ({ id, hidden }: Layer) {
    const layout = this.layouts[id]
    layout.canvas.style.display = hidden ? 'none' : 'block'
  }

  dispose (): void {
    this.#viewport.dispose()
  }
}
