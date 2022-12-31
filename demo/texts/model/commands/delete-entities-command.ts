import { MutableAppState } from '../app-state'
import { Command } from './command'

export class DeleteEntitiesCommand extends Command<string[]> {
  constructor (ids: string[]) {
    super()
    this.data = ids
  }

  execute (appState: MutableAppState): void {
    const storage = appState.storage()
    const selectedLayer = appState.selectedLayer()
    this.data!.forEach(p => {
      storage.remove(p)
      selectedLayer.remove(p)
    })
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
