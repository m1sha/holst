import { Drawable } from '../../../../src'
import { Entity } from '../entities/entity'
import { EntitiesStorage } from '../storage'
import { Command } from './command'

export class SelectEntitiesCommand extends Command<string[]> {
  readonly selectType: 'none' | 'add'
  constructor (ids: string[], selectType: 'none' | 'add') {
    super()
    this.data = ids
    this.selectType = selectType
  }

  invoke (storage: EntitiesStorage, state: { selectedEntities: Entity<Drawable>[]}) {
    const items = storage.filterByIds(this.data ?? [])
    storage.entities.forEach(p => (p.selected = false))
    items.forEach(p => (p.selected = true))
    if (items) state.selectedEntities.push(...items)
  }
}
