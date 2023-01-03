import { Renderer2D, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { AddedEntityCommand } from '../../model/commands/added-entity-command'
import { ChangeBackgroundSizeCommand } from '../../model/commands/change-background-size-command'
import { ChangeToolCommand } from '../../model/commands/change-tool-command'
import { Command } from '../../model/commands/command'
// import { CreateSketchTool, CreateTextTool, SelectTool } from '../../model/tool'
import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'
import { ActionController } from './action-controller'

export class Viewer extends StateComponent<HTMLCanvasElement> {
  private controller: ActionController

  constructor (state: AppState) {
    super(state)
    this.controller = new ActionController(this.state, this)
  }

  build () {
    const ctx = this.rootElement.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.state.scene)

    // renderer.onFrameChanged = () => {
    //   // const tool = this.state.selectedTool
    //   // if (tool instanceof CreateTextTool) this.rootElement.style.cursor = 'text'
    //   // if (tool instanceof CreateSketchTool) this.rootElement.style.cursor = 'crosshair'
    //   // if (tool instanceof SelectTool) this.rootElement.style.cursor = 'default'
    // }

    this.send(new ChangeBackgroundSizeCommand({ width: this.rootElement.width, height: this.rootElement.height }))
  }

  update () {
    //
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof AddedEntityCommand) {
      this.controller.add(command.data!.target as TextBlock)
    }
    if (command instanceof ChangeToolCommand) {
      this.rootElement.style.cursor = this.state.defaultCursor
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
