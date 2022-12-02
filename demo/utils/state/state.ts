import { Drawable, Layer, Scene } from '../../../src'

export class State {
  private delegates: (() => void)[] = []
  readonly objects: Drawable[] = []
  selectedObject: Drawable | null = null
  selectedLayer: Layer | null = null
  #scene: Scene | null = null

  constructor () {
    this.selectedLayer = this.scene.createLayer()
  }

  get scene () {
    if (!this.#scene) this.#scene = new Scene()
    return this.#scene
  }

  update () {
    this.delegates.forEach(p => p())
  }

  addOnChange (delegate: () => void) {
    this.delegates.push(delegate)
  }
}
