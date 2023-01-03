import { Tool, ToolNames } from '../tool'

export class TransformTool extends Tool {
  get name (): ToolNames { return 'transform' }
}
