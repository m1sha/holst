import { MutableAppState } from '../app-state'
import { Command } from './command'

export class StartMoveEntitiesCommand extends Command<string[]> {
  ids: string[]

  constructor (ids: string[]) {
    super()
    this.ids = ids
  }

  execute (appState: MutableAppState): void {
    //
  }

  rollback (appState: MutableAppState): void {
    //
  }
}
