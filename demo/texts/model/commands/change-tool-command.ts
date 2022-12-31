import { MutableAppState } from '../app-state'
import { Tool } from '../tool'
import { Command } from './command'

export class ChangeToolCommand extends Command<Tool> {
  private previousTool: Tool | null = null
  constructor (tool: Tool) {
    super()
    this.data = tool
  }

  execute (appState: MutableAppState): void {
    this.previousTool = appState.selectedTool()
    appState.setTool(this.data!)
  }

  rollback (appState: MutableAppState): void {
    appState.setTool(this.previousTool!)
  }
}
