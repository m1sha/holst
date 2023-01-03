import { MouseCursorTypes } from '../../../../src/core/events/mouse-cursor-types'

type ManipulationToolNames = 'select' | 'move' | 'rotate' | 'transform'
type CreateEntityToolNames = 'create-text' | 'create-sketch' | 'create-raster'
type RasterToolNames = 'pen' | 'brush' | 'polygon' | 'shape' | 'fill' | 'eraser'

export type ToolNames = ManipulationToolNames | CreateEntityToolNames | RasterToolNames
export abstract class Tool {
  abstract get name (): ToolNames
  get cursor (): MouseCursorTypes { return 'default' }
}
