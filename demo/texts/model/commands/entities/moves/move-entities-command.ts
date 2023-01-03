import { IPoint } from '../../../../../../src'
import { MutableAppState } from '../../../app-state'
import { Command } from '../../command'

export class MoveEntitiesCommand extends Command<string[]> {
  constructor (ids: string[], point: IPoint) {
    super()
    this.data = ids
  }

  execute (appState: MutableAppState): void {
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('MoveEntitiesCommand')
    super.rollback(appState)
  }
}
