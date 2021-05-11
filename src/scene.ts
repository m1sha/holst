import { EventHandler, Activity } from './event-handler'
import { EventType } from './event-type'
import { Layer } from './layers'
import { Rect } from './rect'

export abstract class Scene implements Activity {
    readonly ctx: CanvasRenderingContext2D
    private readonly handler: EventHandler
    readonly bounds: Rect
    private readonly layers: Layer []
    readonly actionLayer: Layer

    constructor (canvas: HTMLCanvasElement) {
      this.ctx = canvas.getContext('2d')
      this.bounds = { x: 0, y: 0, width: canvas.width, height: canvas.height }
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
      for (const layer of [...this.layers, this.actionLayer]) layer.render()
    }

    clear () {
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
