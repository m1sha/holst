import { MouseCursorTypes } from '../../../../src/core/events/mouse-cursor-types'
export type ToolNames = 'select' | 'move' | 'rotate' | 'transform' | 'create-text' | 'create-sketch' | 'create-raster'
export abstract class Tool {
  abstract get name (): ToolNames
  get cursor (): MouseCursorTypes { return 'default' }
}
