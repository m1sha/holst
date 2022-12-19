import { Drawable } from '../../../src'
import { removeItem } from '../../../src/utils/array'
import { Entity } from './entities/entity'
// import { EntityReadonly } from './entities/entity-readonly'

export class EntitiesStorage {
  entities: Array<Entity<Drawable>> = []

  add (entity: Entity<Drawable>) {
    this.entities.push(entity)
  }

  refresh () {
    this.entities.forEach(entity => entity.update())
  }

  findById (id: string) {
    return this.entities.find(entity => entity.target.id === id)
  }

  filterByIds (ids: string[]) {
    return this.entities.filter(entity => ids.indexOf(entity.target.id) > -1)
  }

  remove (id: string) {
    removeItem(this.entities, p => p.target.id === id)
  }
}
