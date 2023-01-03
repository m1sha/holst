import { Tool, ToolNames } from '../tool'

export class EraserTool extends Tool {
  get name (): ToolNames { return 'eraser' }
}
