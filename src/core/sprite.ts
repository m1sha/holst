import { Size } from './size'
import { Raster } from './raster'
import Orderable from './orderable'
import { IPoint, Point } from './point'
export class Sprite implements Orderable {
  order: number = 0
  raster: Raster
  tileSize: Size
  readonly frames: number
  position: IPoint
  framePosition: IPoint
  constructor (raster: Raster, tileSize: Size) {
    this.position = Point.zero
    this.framePosition = Point.zero
    this.raster = raster
    this.tileSize = tileSize
    this.frames = (raster.srcRect.width / tileSize.width) * (raster.srcRect.height / tileSize.height)
  }

  set frame (value: number) {
    if (value > this.frames) throw Error(`The frame ${value} out of range`)
    this.framePosition.x = value * this.tileSize.width
  }

  get frame () {
    return this.framePosition.x / this.tileSize.width
  }

  next () {
    this.frame = this.frame < this.frames - 1 ? this.frame + 1 : 0
  }
}
