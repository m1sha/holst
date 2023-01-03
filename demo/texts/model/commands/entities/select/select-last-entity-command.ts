import { lastItem } from '../../../../../../src/utils/array'
import { MutableAppState } from '../../../app-state'
import { Command } from '../../command'

export class SelectLastEntityCommand extends Command<never> {
  execute (appState: MutableAppState): void {
    appState.clearSelected()
    const storage = appState.storage()

    storage.entities.forEach(p => (p.selected = false))
    const entity = lastItem(storage.entities)
    entity.selected = true
    appState.selectedEntities().push(entity)

    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('SelectLastEntityCommand')

    super.rollback(appState)
  }
}
