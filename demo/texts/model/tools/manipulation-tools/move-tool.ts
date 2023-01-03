import { Tool, ToolNames } from '../tool'

export class MoveTool extends Tool {
  get name (): ToolNames { return 'move' }
}
