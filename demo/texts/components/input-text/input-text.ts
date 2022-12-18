import { IPoint } from '../../../../src'
import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { CreateInputTextCommand } from '../../model/commands/create-input-text-command'
import { CreateTextCommand } from '../../model/commands/create-text-command'
import { InputTextCommand } from '../../model/commands/input-text-command'

import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'

export class InputText extends StateComponent<HTMLDivElement> {
  protected get name (): string { return 'input-text' }
  protected get elementType (): string { return 'div' }
  protected onElementSetting (element: HTMLDivElement): void {
    element.contentEditable = 'true'
    element.textContent = 'Enter text'
    element.style.display = 'none'
    element.addEventListener('input', e => this.onInput(e))
    element.addEventListener('keydown', e => this.onKeydown(e))
  }

  private setPosition ({ x, y }: IPoint) {
    const element = this.rootElement
    element.textContent = 'Enter text'
    element.style.top = y + 'px'
    element.style.left = x + 'px'
    element.style.display = 'block'
    document.getSelection()?.selectAllChildren(element)
    element.focus()
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof CreateInputTextCommand) {
      this.setPosition(command.data![0])
    }
  }

  private onInput (e: Event) {
    e.stopPropagation()
    const element = this.rootElement
    const text = element.innerHTML!.replace(/<br>/ig, '').replace(/<div>/ig, '\n').replace(/<\/div>/ig, '')
    this.send(new InputTextCommand(text))
  }

  private onKeydown (e: KeyboardEvent) {
    e.stopPropagation()
    if (e.key.toLocaleLowerCase() === 'enter') {
      const element = this.rootElement
      if (e.ctrlKey) {
        this.send(new CreateTextCommand())
        element.style.display = 'none'
        return
      }
      // this.send(new InputTextCommand(element.textContent! + '\n'))
    }
    if (e.key.toLocaleLowerCase() === 'escape') {
      const element = this.rootElement
      element.style.display = 'none'
    }
  }
}
