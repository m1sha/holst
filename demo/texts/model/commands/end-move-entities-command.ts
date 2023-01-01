import { MutableAppState } from '../app-state'
import { Command } from './command'

export class EndMoveEntitiesCommand extends Command<string[]> {
  ids: string[]

  constructor (ids: string[]) {
    super()
    this.ids = ids
  }

  execute (appState: MutableAppState): void {
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    super.rollback(appState)
  }
}
