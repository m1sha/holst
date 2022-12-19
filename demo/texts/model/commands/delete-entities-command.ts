import { Command } from './command'

export class DeleteEntitiesCommand extends Command<string[]> {
  constructor (ids: string[]) {
    super()
    this.data = ids
  }
}
