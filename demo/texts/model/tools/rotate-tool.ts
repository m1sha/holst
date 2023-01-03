import { Tool, ToolNames } from './tool'

export class RotateTool extends Tool {
  get name (): ToolNames { return 'rotate' }
}
