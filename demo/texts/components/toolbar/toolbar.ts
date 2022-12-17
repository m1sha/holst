import { ChangeToolCommand } from '../../model/commands/change-tool-command'
import { CreateRectTool, CreateTextTool, SelectTool } from '../../model/tool'
import { StateComponent } from '../base/state-component'

export class Toolbar extends StateComponent<HTMLDivElement> {
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement

    const createTextBtn = this.createButton('createText', 'font')
    const createShapesBtn = this.createButton('createShape', 'shapes')
    const selectBtn = this.createButton('selectTool', 'mouse-pointer')

    createTextBtn[1].addEventListener('click', () => this.send(new ChangeToolCommand(new CreateTextTool())))
    createShapesBtn[1].addEventListener('click', () => this.send(new ChangeToolCommand(new CreateRectTool())))
    selectBtn[1].addEventListener('click', () => this.send(new ChangeToolCommand(new SelectTool())))

    root.append(createTextBtn[0])
    root.append(createShapesBtn[0])
    root.append(selectBtn[0])
  }

  private createButton (name: string, icon: string) {
    const wrapper = document.createElement('div')
    wrapper.className = 'toolbar-button-wrapper'

    const btn = document.createElement('div')
    btn.className = 'toolbar-button'

    const i = document.createElement('i')
    i.className = 'fa fa-' + icon

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'toolbar'
    radio.style.display = 'none'
    radio.value = name

    btn.addEventListener('click', () => radio.click())

    btn.append(i)
    wrapper.append(radio)
    wrapper.append(btn)
    return [wrapper, radio]
  }
}
