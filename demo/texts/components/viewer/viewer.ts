import { Renderer2D, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { AddedEntityCommand } from '../../model/commands/added-entity-command'
import { ChangeBackgroundSizeCommand } from '../../model/commands/change-background-size-command'
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
    const ctx = this.rootElement.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.state.scene)

    renderer.onFrameChanged = () => {
      const tool = this.state.selectedTool
      if (tool instanceof CreateTextTool) this.rootElement.style.cursor = 'text'
      if (tool instanceof CreateRectTool) this.rootElement.style.cursor = 'crosshair'
      if (tool instanceof SelectTool) this.rootElement.style.cursor = 'default'
    }

    this.send(new ChangeBackgroundSizeCommand({ width: this.rootElement.width, height: this.rootElement.height }))
  }

  update () {
    //
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof AddedEntityCommand) {
      this.movement.add(command.data!.target as TextBlock)
    }
    this.update()
  }

  protected get name (): string { return 'viewer' }
  protected get elementType (): string { return 'canvas' }
  protected onElementSetting (element: HTMLCanvasElement) {
    element.width = 1200
    element.height = 1600
  }
}
