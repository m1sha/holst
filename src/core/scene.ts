import { Context2D, Context2DOrientation } from './context2d'
import { EventHandler, Activity } from './event-handler'
import { EventType } from './event-type'
import { Layer } from './layers'
import { Point } from './point'
import { Size } from './size'

export abstract class Scene implements Activity {
    readonly ctx: Context2D
    private readonly handler: EventHandler
    readonly size: Size
    private readonly layers: Layer []
    readonly actionLayer: Layer
    readonly center: Point

    constructor (canvas: HTMLCanvasElement, orientation?: Context2DOrientation) {
      this.ctx = new Context2D(canvas.getContext('2d'))
      this.ctx.orientation = orientation || 'top-left'
      this.size = { width: canvas.width, height: canvas.height }
      this.center = { x: this.size.width / 2, y: this.size.height / 2 }
      this.layers = []
      this.actionLayer = new Layer(this.ctx)
      this.handler = new EventHandler(this)
    }

    createLayer (): Layer {
      const result = new Layer(this.ctx)
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

    addEventListener (eventType: EventType, callback: (e) => void) {
      this.handler.on = (et, e) => {
        if (et !== eventType) {
          return
        }

        callback(e)
      }
    }
}
