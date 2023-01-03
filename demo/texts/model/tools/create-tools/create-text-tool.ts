import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { Tool, ToolNames } from '../tool'

export class CreateTextTool extends Tool {
  get name (): ToolNames { return 'create-text' }
  get cursor (): MouseCursorTypes { return 'text' }
}
