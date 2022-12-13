import { State } from '../../model/state'
import { Component } from './component'

export abstract class StateComponent<TRootElement extends HTMLElement> extends Component<TRootElement> {
  protected state: State

  constructor (state: State) {
    super()
    this.state = state
  }
}
