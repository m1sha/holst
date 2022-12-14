import { Drawable } from '../../../src'
import { Entity } from './entities/entity'
import { EntityReadonly } from './entities/entity-readonly'

export class ObjectStorage {
  entities: Entity<Drawable>[] = []
  addViewObject (entity: Entity<Drawable>) {
    this.entities.push(entity)
  }

  update () {
    this.entities.forEach(p => p.update())
  }

  select (entity: EntityReadonly<Drawable>) {
    this.unselect()
    for (const origin of this.entities) {
      if (origin.equals(entity)) {
        origin.selected = true
        return
      }
    }
  }

  unselect () {
    this.entities.forEach(p => (p.selected = false))
  }
}
