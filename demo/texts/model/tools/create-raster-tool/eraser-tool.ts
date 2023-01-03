import { RasterTool, RasterToolNames } from './raster-tool'

export class EraserTool extends RasterTool {
  get name (): RasterToolNames { return 'eraser' }
}
