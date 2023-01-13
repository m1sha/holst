import { Size } from '../../../../../src'
import { MutableAppState } from '../../app-state'
import { Command } from '../command'

export class ChangeBackgroundSizeCommand extends Command<Size> {
  constructor (size: Size) {
    super()
    this.data = size
  }

  execute (appState: MutableAppState): void {
    if (!this.data) return

    appState.background().changeSize(this.data)
  }

  rollback (appState: MutableAppState): void {
    // nothing occurs
  }

  get needRegistrate () { return false }
}
