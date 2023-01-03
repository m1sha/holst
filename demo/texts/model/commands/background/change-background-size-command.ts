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
    const rect = appState.background().rects[0]
    rect.height = this.data.height
    rect.width = this.data.width
  }

  rollback (appState: MutableAppState): void {
    // nothing occurs
  }

  get needRegistrate () { return false }
}
