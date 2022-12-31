import { MutableAppState } from '../app-state'
import { Command } from './command'

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
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
