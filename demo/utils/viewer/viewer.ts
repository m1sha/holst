import { Renderer2D, TextBlock } from '../../../src'
import { MovementController } from '../movement/movement-controller'
import { State } from '../state/state'

export class Viewer {
  private movement: MovementController
  private state: State
  #rootElement: HTMLCanvasElement | null = null

  constructor (state: State) {
    this.state = state
    this.state.addOnChange(() => {
      this.update()
    })
    this.movement = new MovementController(this.state)
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
    this.state.viewObjects.forEach(p => this.movement.add(p.object as TextBlock))

    const ctx = this.rootElement.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.state.scene)
  }

  update () {
    //
  }
}
