import { RasterTool, RasterToolNames } from './raster-tool'

export class PenTool extends RasterTool {
  get name (): RasterToolNames { return 'pen' }
}
