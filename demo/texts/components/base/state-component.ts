import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { Component } from './component'

export abstract class StateComponent<TRootElement extends HTMLElement> extends Component<TRootElement> {
  protected state: AppState

  constructor (state: AppState) {
    super()
    this.state = state

    this.state.addInvoker((sender, command) => this.onStateChanged(sender, command))
  }

  protected send (command: Command<any>) {
    this.state.sendCommand(this, command)
  }

  protected onStateChanged (sender: Component<HTMLElement> | AppState, command: Command<any>) {}
}
