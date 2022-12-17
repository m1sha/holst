import { Renderer2D, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { CreateRectTool, CreateTextTool, SelectTool } from '../../model/tool'
import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'
import { MovementController } from './movement/movement-controller'

export class Viewer extends StateComponent<HTMLCanvasElement> {
  private movement: MovementController

  constructor (state: AppState) {
    super(state)
    this.movement = new MovementController(this.state, this)
  }

  build () {
    this.state.entities.forEach(p => this.movement.add(p.target as TextBlock))

    const ctx = this.rootElement.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.state.scene)

    renderer.onFrameChanged = () => {
      const tool = this.state.selectedTool
      if (tool instanceof CreateTextTool) this.rootElement.style.cursor = 'text'
      if (tool instanceof CreateRectTool) this.rootElement.style.cursor = 'crosshair'
      if (tool instanceof SelectTool) this.rootElement.style.cursor = 'default'
    }
  }

  update () {
    //
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    this.update()
  }

  protected get name (): string { return 'viewer' }
  protected get elementType (): string { return 'canvas' }
  protected onElementSetting (element: HTMLCanvasElement) {
    element.width = 800
    element.height = 600
  }
}
