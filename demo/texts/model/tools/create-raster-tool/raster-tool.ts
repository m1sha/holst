export type RasterToolNames = 'pen' | 'brush' | 'polygon' | 'shape' | 'fill' | 'eraser'

export abstract class RasterTool {
  abstract get name (): RasterToolNames
}
