import { MutableAppState } from '../app-state'
import { Tool } from '../tool'
import { Command } from './command'

export class ChangeToolCommand extends Command<Tool> {
  constructor (tool: Tool) {
    super()
    this.data = tool
  }

  execute (appState: MutableAppState): void {
    appState.setTool(this.data!)
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
