import { RasterTool, RasterToolNames } from './raster-tool'

export class BrushTool extends RasterTool {
  get name (): RasterToolNames { return 'brush' }
}
