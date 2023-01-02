import { MutableAppState } from '../app-state'
import { ToolNames } from '../tool'
import { Command } from './command'

export class ChangeToolCommand extends Command<ToolNames> {
  private previousTool: ToolNames | null = null
  constructor (toolName: ToolNames) {
    super()
    this.data = toolName
  }

  execute (appState: MutableAppState): void {
    this.previousTool = appState.selectedTool()?.name
    appState.setTool(this.data!)
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    appState.setTool(this.previousTool!)
    super.rollback(appState)
  }
}
