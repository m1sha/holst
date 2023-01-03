import { MutableAppState } from '../../../app-state'
import { Command } from '../../command'

export class SelectEntitiesCommand extends Command<string[]> {
  readonly selectType: 'none' | 'add'
  constructor (ids: string[], selectType: 'none' | 'add') {
    super()
    this.data = ids
    this.selectType = selectType
  }

  execute (appState: MutableAppState): void {
    appState.clearSelected()
    const storage = appState.storage()
    const items = storage.filterByIds(this.data ?? [])
    storage.entities.forEach(p => (p.selected = false))
    items.forEach(p => (p.selected = true))
    if (items) appState.selectedEntities().push(...items)

    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('SelectEntitiesCommand')

    super.rollback(appState)
  }
}
