import { Context2D, Context2DOrientation } from './context2d'
import { EventHandler, Activity, EventInfo } from './event-handler'
import { EventType } from './event-type'
import { Layer } from './layers'
import { Point } from './point'
import { Size } from './size'

export class Scene implements Activity {
    readonly ctx: Context2D
    private readonly handler: EventHandler
    readonly size: Size
    private readonly layers: Layer []
    readonly actionLayer: Layer
    readonly center: Point

    constructor (canvas: HTMLCanvasElement) {
      this.ctx = new Context2D(canvas.getContext('2d'))
      this.size = { width: canvas.width, height: canvas.height }
      this.center = { x: this.size.width / 2, y: this.size.height / 2 }
      this.layers = []
      this.actionLayer = new Layer(this.ctx, 'top-left')
      this.handler = new EventHandler(this)
    }

    createLayer (orientation?: Context2DOrientation): Layer {
      const result = new Layer(this.ctx, orientation || 'top-left')
      this.layers.push(result)
      return result
    }

    render (): void {
      for (const layer of [...this.layers, this.actionLayer]) layer.draw()
    }

    clear () {
      this.ctx.ctx.clearRect(0, 0, this.size.width, this.size.height)
      this.actionLayer.clear()
    }

    addEventListener (eventType: EventType, callback: (e: EventInfo) => void) {
      this.handler.addEventListener(eventType, callback)
    }
}
