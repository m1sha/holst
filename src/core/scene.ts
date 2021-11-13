import { Context2DOrientation } from './context2d'
import { Layer } from './layers'
import { Point } from './point'
import { Size } from './size'

export class Scene {
    readonly size: Size
    private layers: Layer []
    readonly actionLayer: Layer
    readonly center: Point

    constructor (size: Size) {
      this.size = { width: size.width, height: size.height }
      this.center = { x: this.size.width / 2, y: this.size.height / 2 }
      this.layers = []
      this.actionLayer = new Layer(this.size, 'top-left')
    }

    createLayer (orientation?: Context2DOrientation): Layer {
      const result = new Layer(this.size, orientation || 'top-left')
      this.layers.push(result)
      return result
    }

    clearAllLayers () {
      this.clearActiveLayer()
      for (const layer of [...this.layers]) layer.clear()
      this.layers = []
    }

    clearActiveLayer () {
      this.actionLayer.clear()
    }

    get allLayers (): Readonly<Layer>[] {
      return this.layers
    }
}
