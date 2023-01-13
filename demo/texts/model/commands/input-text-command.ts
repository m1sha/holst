import { MutableAppState } from '../app-state'
import { Command } from './command'

export class InputTextCommand extends Command<string> {
  constructor (value: string) {
    super()
    this.data = value
  }

  execute (appState: MutableAppState): void {
    appState.setCurrentText(this.data!)
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('InputTextCommand')
    super.rollback(appState)
  }
}
