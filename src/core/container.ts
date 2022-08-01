import { Anchor } from './anchor'
import { Drawable } from './drawable'

export class Container {
  #anchor: Anchor | null = null

  setAnchor (anchor: Anchor) {
    this.#anchor = anchor
    anchor.addChild(this as unknown as Drawable)
  }

  clearContainer () {
    if (this.#anchor) this.#anchor.container = null
  }

  get anchor () {
    return this.#anchor
  }
}
