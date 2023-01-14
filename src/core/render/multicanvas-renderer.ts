import { Layer } from '../layers'
import { Scene } from '../scene'
import { RendererBase } from './renderer'

export class MultiCanvasRenderer extends RendererBase {
  #element: HTMLDivElement
  private backgroundCanvas: HTMLCanvasElement
  private canvases: Record<string, HTMLCanvasElement> = {}

  constructor () {
    super()
    this.backgroundCanvas = document.createElement('canvas')
    this.#element = document.createElement('div')
    this.#element.className = 'wrapper'
    this.#element.append(this.backgroundCanvas)
  }

  render (scene: Scene): void {
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (!layer.modified) continue
      let canvas = this.canvases[layer.id]
      if (!canvas) {
        canvas = document.createElement('canvas')
        this.canvases[layer.id] = canvas
        this.#element.append(canvas)
      }
      this.drawLayer(layer, canvas.getContext('2d')!)
    }
    // this.drawLayer(scene.actionLayer, this.ctx)
  }

  clear (): void {

  }

  get element () {
    return this.#element
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.backgroundCanvas
  }
}
