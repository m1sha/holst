import { Tool, ToolNames } from '../tool'

export class BrushTool extends Tool {
  get name (): ToolNames { return 'brush' }
}
