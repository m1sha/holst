import { MutableAppState } from '../app-state'
import { Command } from './command'

export class EntityValue {
  value: any
  type: any
}

export class ChangeEntityValueCommand extends Command<EntityValue> {
  constructor (value: EntityValue) {
    super()
    this.data = value
  }

  execute (appState: MutableAppState): void {
    //
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
