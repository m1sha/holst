import { Renderer2D, Context2DOrientation } from './context2d'
import { EventHandler, Activity, EventInfo } from './event-handler'
import { EventType } from './event-type'
import { Layer } from './layers'
import { Point } from './point'
import { Size } from './size'

export class Scene implements Activity {
    readonly renderer: Renderer2D
    private readonly handler: EventHandler
    readonly size: Size
    private layers: Layer []
    readonly actionLayer: Layer
    readonly center: Point

    constructor (canvas: HTMLCanvasElement) {
      this.renderer = new Renderer2D(canvas.getContext('2d'))
      this.size = { width: canvas.width, height: canvas.height }
      this.center = { x: this.size.width / 2, y: this.size.height / 2 }
      this.layers = []
      this.actionLayer = new Layer(this.size, 'top-left')
      this.handler = new EventHandler(this)
    }

    createLayer (orientation?: Context2DOrientation): Layer {
      const result = new Layer(this.size, orientation || 'top-left')
      this.layers.push(result)
      return result
    }

    render (): void {
      this.renderer.render(this)
    }

    clear (soft: boolean = false) {
      this.renderer.clear()
      if (!soft) this.actionLayer.clear()
    }

    clearAll () {
      for (const layer of [...this.layers]) layer.clear()
      this.layers = []
      this.clear()
    }

    addEventListener (eventType: EventType, callback: (e: EventInfo) => void) {
      this.handler.addEventListener(eventType, callback)
    }

    get allLayers (): Readonly<Layer>[] {
      return this.layers
    }
}
