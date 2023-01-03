import { MouseCursorTypes } from '../../../../src/core/events/mouse-cursor-types'
import { MutableAppState } from '../app-state'
import { ToolNames } from '../tool'
import { Command } from './command'

export class ChangeToolCommand extends Command<ToolNames> {
  private previousTool: ToolNames | null = null
  private previousCursor: MouseCursorTypes = 'default'

  constructor (toolName: ToolNames) {
    super()
    this.data = toolName
  }

  execute (appState: MutableAppState): void {
    const previousTool = appState.selectedTool()
    this.previousTool = previousTool.name
    this.previousCursor = previousTool.cursor
    appState.setTool(this.data!)
    appState.setDefaultCursor(appState.selectedTool().cursor)
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    appState.setTool(this.previousTool!)
    appState.setDefaultCursor(this.previousCursor)
    super.rollback(appState)
  }
}
