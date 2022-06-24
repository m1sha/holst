import { Size } from './size'
import { Raster } from './bitmap'

export class Sprite {
  raster: Raster
  tileSize: Size
  constructor (raster: Raster, tileSize: Size) {
    this.raster = raster
    this.tileSize = tileSize
  }
}
