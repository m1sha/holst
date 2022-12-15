import { Command } from './command'

export class SelectEntitiesCommand extends Command<string[]> {
  readonly selectType: 'none' | 'add'
  constructor (ids: string[], selectType: 'none' | 'add') {
    super()
    this.data = ids
    this.selectType = selectType
  }
}
