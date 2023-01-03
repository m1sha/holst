import { RasterTool, RasterToolNames } from './raster-tool'

export class ShapeTool extends RasterTool {
  get name (): RasterToolNames { return 'shape' }
}
