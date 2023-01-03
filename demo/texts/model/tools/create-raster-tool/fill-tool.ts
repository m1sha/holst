import { RasterTool, RasterToolNames } from './raster-tool'

export class FillTool extends RasterTool {
  get name (): RasterToolNames { return 'fill' }
}
