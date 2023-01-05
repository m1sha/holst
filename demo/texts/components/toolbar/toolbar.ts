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

    buttons.createButton('undo', 'undo').onClick = () => this.state.undo()
    buttons.createButton('redo', 'redo').onClick = () => this.state.redo()

    createSeparator(root)

    buttons.createRadio('create-text', 'font', 'toolbar')
      .title('Create text')
      .onClick = () => this.changeTool('create-text')
    buttons.createRadio('create-sketch', 'shapes', 'toolbar')
      .title('Create sketch')
      .onClick = () => this.changeTool('create-sketch')
    buttons.createRadio('create-raster', 'image', 'toolbar')
      .title('Create raster')
      .onClick = () => this.changeTool('create-raster')

    createSeparator(root)

    buttons.createRadio('select', 'mouse-pointer', 'toolbar')
      .title('Select object(s)')
      .onClick = () => this.changeTool('select')
    buttons.createRadio('move', 'arrows-alt', 'toolbar')
      .title('Move object(s)')
      .onClick = () => this.changeTool('move')
    buttons.createRadio('rotate', 'sync', 'toolbar')
      .title('Rotate object(s)')
      .onClick = () => this.changeTool('rotate')
    buttons.createRadio('transform', 'vector-square', 'toolbar')
      .title('Transform object')
      .onClick = () => this.changeTool('transform')

    createSeparator(root)

    buttons.createRadio('sketchPenTool', 'square', 'sketch-draw-tools')
    buttons.createRadio('sketchBrushTool', 'circle', 'sketch-draw-tools')
    buttons.createRadio('sketchDrawPolygonTool', 'draw-polygon', 'sketch-draw-tools')

    buttons.visibleRadioGroup('sketch-draw-tools', false)

    buttons.createRadio('rasterPenTool', 'pen', 'raster-draw-tools')
      .title('Pen tool')
      .onClick = () => this.changeTool('pen')
    buttons.createRadio('rasterBrushTool', 'paint-brush', 'raster-draw-tools')
      .title('Brush tool')
      .onClick = () => this.changeTool('brush')
    buttons.createRadio('rasterDrawPolygonTool', 'draw-polygon', 'raster-draw-tools')
      .title('Draw polygon tool')
      .onClick = () => this.changeTool('polygon')
    buttons.createRadio('rasterSplotchTool', 'splotch', 'raster-draw-tools')
      .title('Draw shape tool')
      .onClick = () => this.changeTool('shape')
    buttons.createRadio('rasterEraserTool', 'eraser', 'raster-draw-tools')
      .title('Eraser tool')
      .onClick = () => this.changeTool('eraser')
    buttons.createRadio('rasterFillTool', 'fill', 'raster-draw-tools')
      .title('Fill region tool')
      .onClick = () => this.changeTool('fill')

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
