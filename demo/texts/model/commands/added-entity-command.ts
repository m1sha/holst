import { Drawable } from '../../../../src'
import { MutableAppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'

export class AddedEntityCommand extends Command<Entity<Drawable>> {
  constructor (entity: Entity<Drawable>) {
    super()
    this.data = entity
  }

  execute (appState: MutableAppState): void {
    appState.storage().add(this.data!)
    this.data!.create(appState.selectedLayer())
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
