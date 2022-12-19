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
}
