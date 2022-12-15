import { AppState } from '../../model/app-state'
import { CommandNames } from '../../model/command-names'
import { Component } from './component'

export abstract class StateComponent<TRootElement extends HTMLElement> extends Component<TRootElement> {
  protected state: AppState

  constructor (state: AppState) {
    super()
    this.state = state

    this.state.addInvoker((sender, commandName, data) => this.onStateChanged(sender, commandName, data))
  }

  protected send (commandName: CommandNames, data?: any) {
    this.state.sendCommand(this, commandName, data)
  }

  protected onStateChanged (sender: Component<HTMLElement> | AppState, commandName: CommandNames, data: any) {}
}
