import { Renderer2D, TextBlock } from '../../../../src'
import { State } from '../../model/state'
import { Component } from '../base/component'
import { MovementController } from './movement/movement-controller'

export class Viewer extends Component<HTMLCanvasElement> {
  private movement: MovementController
  private state: State

  constructor (state: State) {
    super()
    this.state = state
    this.state.addOnChange(() => this.update())
    this.movement = new MovementController(this.state)
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

  protected get name (): string { return 'viewer' }
  protected get elementType (): string { return 'canvas' }
  protected onElementSetting (element: HTMLCanvasElement) {
    element.width = 800
    element.height = 600
  }
}
