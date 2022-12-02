import { Drawable, Layer } from '../../../src'

export class State {
  private delegates: (() => void)[] = []
  readonly objects: Drawable[] = []
  selectedObject: Drawable | null = null
  selectedLayer: Layer | null = null

  update () {
    this.delegates.forEach(p => p())
  }

  addOnChange (delegate: () => void) {
    this.delegates.push(delegate)
  }
}
