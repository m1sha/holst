import { MutableAppState } from '../../app-state'
import { Command } from '../command'

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
      selectedLayer.removeById(p)
    })
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('DeleteEntitiesCommand')
    super.rollback(appState)
  }
}
