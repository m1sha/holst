import { Drawable } from '../../../../src/core/drawable'
import { MutableAppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'

export class VisibleEntitiesCommand extends Command<any> {
  private visible: boolean
  private entity: Entity<Drawable>

  constructor (visible: boolean, entity: Entity<Drawable>) {
    super()
    this.visible = visible
    this.entity = entity
  }

  execute (appState: MutableAppState): void {
    this.entity.target.hidden = !this.visible
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    this.entity.target.hidden = this.visible
    super.rollback(appState)
  }
}
