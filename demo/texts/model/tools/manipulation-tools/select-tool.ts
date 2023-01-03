import { Tool, ToolNames } from '../tool'

export class SelectTool extends Tool {
  get name (): ToolNames { return 'select' }
}
