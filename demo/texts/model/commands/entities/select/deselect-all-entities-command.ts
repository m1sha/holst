import { MutableAppState } from '../../../app-state'
import { Command } from '../../command'

export class DeselectAllEntitiesCommand extends Command<never> {
  execute (appState: MutableAppState): void {
    appState.clearSelected()
    const storage = appState.storage()
    storage.entities.forEach(p => (p.selected = false))
    super.execute(appState)
  }
}
