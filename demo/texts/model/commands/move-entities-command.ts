import { Drawable, IPoint } from '../../../../src'
import { Entity } from '../entities/entity'
import { EntitiesStorage } from '../storage'
import { Command } from './command'

export class MoveEntitiesCommand extends Command<string[]> {
  constructor (ids: string[], point: IPoint) {
    super()
    this.data = ids
  }

  invoke (storage: EntitiesStorage, state: { selectedEntities: Entity<Drawable>[]}) {
    // const items = storage.filterByIds(this.data ?? [])
    // storage.entities.forEach(p => (p.selected = false))
    // items.forEach(p => (p.selected = true))
    // if (items) state.selectedEntities.push(...items)
  }
}
