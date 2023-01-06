import { Raster } from '../../../../src/core/raster'
import { lastItem } from '../../../../src/utils/array'
import { AppState } from '../../model/app-state'
import { ChangeToolCommand } from '../../model/commands/change-tool-command'
import { Command } from '../../model/commands/command'
import { SelectEntitiesCommand } from '../../model/commands/entities/select/select-entities-command'
import { SelectLastEntityCommand } from '../../model/commands/entities/select/select-last-entity-command'
import { ToolNames } from '../../model/tools/tool'
import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'
import { createSeparator, ToolbarButtons } from './toolbar-buttons'

export class Toolbar extends StateComponent<HTMLDivElement> {
  private buttons: ToolbarButtons = new ToolbarButtons(this.rootElement)
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement
    const buttons = this.buttons

    buttons.createButton('undo', 'undo')
      .title('Undo (Ctrl + Z)')
      .onClick = () => this.state.undo()
    buttons.createButton('redo', 'redo')
      .title('Redo (Ctrl + Y)')
      .onClick = () => this.state.redo()

    createSeparator(root)

    buttons.createRadio('create-text', 'font', 'toolbar')
      .title('Create text (Ctrl + T)')
      .onClick = () => this.changeTool('create-text')
    buttons.createRadio('create-sketch', 'shapes', 'toolbar')
      .title('Create sketch (Ctrl + S)')
      .onClick = () => this.changeTool('create-sketch')
    buttons.createRadio('create-raster', 'image', 'toolbar')
      .title('Create raster (Ctrl + R)')
      .onClick = () => this.changeTool('create-raster')

    createSeparator(root)

    buttons.createRadio('select', 'mouse-pointer', 'toolbar')
      .title('Select objects (Q)')
      .onClick = () => this.changeTool('select')
    buttons.createRadio('move', 'arrows-alt', 'toolbar')
      .title('Move objects (W)')
      .onClick = () => this.changeTool('move')
    buttons.createRadio('rotate', 'sync', 'toolbar')
      .title('Rotate objects (E)')
      .onClick = () => this.changeTool('rotate')
    buttons.createRadio('transform', 'vector-square', 'toolbar')
      .title('Transform object (R)')
      .onClick = () => this.changeTool('transform')

    createSeparator(root)

    buttons.createRadio('sketchPenTool', 'square', 'sketch-draw-tools')
    buttons.createRadio('sketchBrushTool', 'circle', 'sketch-draw-tools')
    buttons.createRadio('sketchDrawPolygonTool', 'draw-polygon', 'sketch-draw-tools')

    buttons.visibleRadioGroup('sketch-draw-tools', false)

    buttons.createRadio('raster-pen', 'pen', 'raster-draw-tools')
      .title('Pen tool (A)')
      .onClick = () => this.changeTool('raster-pen')
    buttons.createRadio('raster-brush', 'paint-brush', 'raster-draw-tools')
      .title('Brush tool (S)')
      .onClick = () => this.changeTool('raster-brush')
    buttons.createRadio('raster-polygon', 'draw-polygon', 'raster-draw-tools')
      .title('Draw polygon tool (D)')
      .onClick = () => this.changeTool('raster-polygon')
    buttons.createRadio('raster-shape', 'splotch', 'raster-draw-tools')
      .title('Draw shape tool (F)')
      .onClick = () => this.changeTool('raster-shape')
    buttons.createRadio('raster-eraser', 'eraser', 'raster-draw-tools')
      .title('Eraser tool (G)')
      .onClick = () => this.changeTool('raster-eraser')
    buttons.createRadio('raster-fill', 'fill', 'raster-draw-tools')
      .title('Fill region tool (H)')
      .onClick = () => this.changeTool('raster-fill')

    buttons.visibleRadioGroup('raster-draw-tools', false)

    const toolName = this.state.selectedTool.name
    buttons.click(toolName)
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof ChangeToolCommand) {
      const toolName = command.data!
      this.buttons.setCheck(toolName, true)
      this.buttons.visibleRadioGroup('sketch-draw-tools', toolName === 'create-sketch')
    }

    if (command instanceof SelectEntitiesCommand || command instanceof SelectLastEntityCommand) {
      const entity = lastItem(this.state.selectedEntities)
      this.buttons.visibleRadioGroup('raster-draw-tools', entity ? entity.target instanceof Raster : false)
    }
  }

  destroy () {
    this.buttons.destroy()
  }

  private changeTool (toolName: ToolNames) {
    this.send(new ChangeToolCommand(toolName))
  }
}
