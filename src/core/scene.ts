import { Layer } from './layers'
import { Point } from './point'
import { Size } from './size'
import { StyleManager } from './style-manager'

export class Scene {
    readonly size: Size
    private layers: Layer []
    readonly actionLayer: Layer
    readonly center: Point
    readonly styleManager: StyleManager

    constructor (size: Size) {
      this.size = { width: size.width, height: size.height }
      this.center = new Point({ x: this.size.width / 2, y: this.size.height / 2 })
      this.layers = []
      this.styleManager = new StyleManager()
      this.actionLayer = new Layer(this.size, this.styleManager)
    }

    createLayer (): Layer {
      const result = new Layer(this.size, this.styleManager)
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
