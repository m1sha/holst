import { ChangeToolCommand } from '../../model/commands/change-tool-command'
import { CreateRectTool, CreateTextTool, SelectTool } from '../../model/tool'
import { StateComponent } from '../base/state-component'
import { RadioToolbarButton, ToolbarButton, createSeparator } from './toolbar-buttons'

export class Toolbar extends StateComponent<HTMLDivElement> {
  private buttons: ToolbarButton[] = []
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement

    const undoBtn = new ToolbarButton('createText', 'undo').create(root)
    const redoBtn = new ToolbarButton('createText', 'redo').create(root)
    undoBtn.onClick = () => this.state.undo()
    redoBtn.onClick = () => this.state.redo()

    createSeparator(root)

    const createTextBtn = new RadioToolbarButton('createText', 'font', 'toolbar').create(root)
    const createShapesBtn = new RadioToolbarButton('createShape', 'shapes', 'toolbar').create(root)
    const selectBtn = new RadioToolbarButton('selectTool', 'mouse-pointer', 'toolbar').create(root)
    createTextBtn.onClick = () => this.send(new ChangeToolCommand(new CreateTextTool()))
    createShapesBtn.onClick = () => this.send(new ChangeToolCommand(new CreateRectTool()))
    selectBtn.onClick = () => this.send(new ChangeToolCommand(new SelectTool()))

    switch (this.state.selectedTool.name) {
      case 'create-text': createTextBtn.click(); break
      case 'create-rect': createShapesBtn.click(); break
      case 'select': selectBtn.click(); break
    }

    this.buttons.push(...[undoBtn, redoBtn, createTextBtn, createShapesBtn, selectBtn])
  }

  destroy () {
    this.buttons.forEach(p => p.destroy())
    this.buttons = []
  }
}
