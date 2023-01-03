import { RasterTool, RasterToolNames } from './raster-tool'

export class PolygonTool extends RasterTool {
  get name (): RasterToolNames { return 'polygon' }
}
