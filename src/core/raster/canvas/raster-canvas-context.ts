import { Raster } from '../../raster'

export class RasterCanvasContext {
  readonly raster: Raster

  constructor (raster: Raster) {
    this.raster = raster
  }
}
