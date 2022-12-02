import { Drawable, Layer, Scene } from '../../../src'
import { ObjectStorage } from '../model/storage'
import { ViewObject } from '../model/view-object'

export class State {
  private delegates: (() => void)[] = []
  selectedLayer: Layer | null = null
  #scene: Scene | null = null
  #storage: ObjectStorage = new ObjectStorage()

  constructor () {
    this.selectedLayer = this.scene.createLayer()
  }

  get scene () {
    if (!this.#scene) this.#scene = new Scene()
    return this.#scene
  }

  get selectedObject () {
    const viewObject = this.#storage.viewObjects.find(p => p.selected)
    return viewObject ? viewObject.object : null
  }

  set selectedObject (value: Drawable | null) {
    if (value) {
      this.#storage.select(value)
    } else {
      this.#storage.unselect()
    }
    this.#storage.update()
  }

  update () {
    this.delegates.forEach(p => p())
  }

  addOnChange (delegate: () => void) {
    this.delegates.push(delegate)
  }

  addViewObject (viewObject: ViewObject) {
    this.#storage.addViewObject(viewObject)
    viewObject.create(this.selectedLayer!)
  }

  addViewObjects (viewObjects: ViewObject[]) {
    viewObjects.forEach(p => this.addViewObject(p))
  }
}
