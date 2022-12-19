import { Drawable } from '../../../../src'
import { Entity } from '../entities/entity'
import { Command } from './command'

export class AddedEntityCommand extends Command<Entity<Drawable>> {
  constructor (entity: Entity<Drawable>) {
    super()
    this.data = entity
  }
}
