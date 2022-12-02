import { Renderer2D } from '../../../src'
import { State } from '../state/state'

export class Viewer {
  private state: State
  #rootElement: HTMLCanvasElement | null = null

  constructor (state: State) {
    this.state = state
    // this.state.addOnChange(() => {
    //   this.build()
    // })
  }

  get rootElement (): HTMLCanvasElement {
    if (!this.#rootElement) {
      this.#rootElement = document.createElement('canvas')
      this.#rootElement.className = 'viewer'
      this.#rootElement.width = 800
      this.#rootElement.height = 600
    }
    return this.#rootElement
  }

  build () {
    const ctx = this.rootElement.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.state.scene)
  }
}
