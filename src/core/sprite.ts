import { Size } from './size'
import { Raster } from './raster'

export class Sprite {
  raster: Raster
  tileSize: Size
  constructor (raster: Raster, tileSize: Size) {
    this.raster = raster
    this.tileSize = tileSize
  }
}
