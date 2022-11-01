import { Scene } from '../scene'
import { Layer } from '../layers'
import { RendererBase } from './renderer'

export class DynamicCanvasRenderer2D extends RendererBase {
  private backgroundCanvas: HTMLCanvasElement
  private foregroundCanvas: HTMLCanvasElement
  private backgroundCtx: CanvasRenderingContext2D
  private foregroundCtx: CanvasRenderingContext2D

  constructor () {
    super()
    this.backgroundCanvas = document.createElement('canvas')
    this.foregroundCanvas = document.createElement('canvas')
    this.backgroundCtx = this.backgroundCanvas.getContext('2d')!!
    this.foregroundCtx = this.foregroundCanvas.getContext('2d')!!
  }

  render (scene: Scene): void {
    super.render(scene)
    const layers = this.sortLayers(scene.layers as Layer[])
    for (const layer of layers) {
      if (layer.canvasOrder === 'foreground') {
        this.drawLayer(layer, this.foregroundCtx)
        continue
      }
      this.drawLayer(layer, this.backgroundCtx)
    }
    this.drawLayer(scene.actionLayer, this.foregroundCtx)
  }

  clear () {
    const { width, height } = this.foregroundCanvas
    this.foregroundCtx.clearRect(0, 0, width, height)
  }

  get canvases () {
    return [this.backgroundCanvas, this.foregroundCanvas]
  }

  protected getCanvas (): HTMLCanvasElement {
    return this.foregroundCanvas
  }
}
