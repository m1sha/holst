import { MouseCursorTypes } from '../../../../src/core/events/mouse-cursor-types'
import { Tool, ToolNames } from './tool'

export class CreateSketchTool extends Tool {
  get name (): ToolNames { return 'create-sketch' }
  get cursor (): MouseCursorTypes { return 'crosshair' }
}
