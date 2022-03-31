import { Layer } from './layers'
import { StyleManager } from './style-manager'

export class Scene {
    private _layers: Layer []
    readonly actionLayer: Layer
    readonly styleManager: StyleManager
    private orderCounter: number = 0
    constructor () {
      this._layers = []
      this.styleManager = new StyleManager()
      this.actionLayer = new Layer(0, this.styleManager)
    }

    createLayer (name?: string): Layer {
      const result = new Layer(++this.orderCounter, this.styleManager)
      this._layers.push(result)
      return result
    }

    clearAllLayers () {
      this.clearActiveLayer()
      for (const layer of [...this._layers]) layer.clear()
      this._layers = []
    }

    clearActiveLayer () {
      this.actionLayer.clear()
    }

    get layers (): Readonly<Layer>[] {
      return this._layers
    }
}
