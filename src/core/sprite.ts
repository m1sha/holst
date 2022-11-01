import { Size } from './geometry/size'
import { Raster } from './raster'
import { IPoint, Point } from './geometry/point'
import { Drawable, DrawableType } from './drawable'
import { Rect } from './geometry/rect'
export class Sprite extends Drawable {
  raster: Raster
  tileSize: Size
  readonly frames: number
  position: IPoint
  framePosition: IPoint

  constructor (raster: Raster, tileSize: Size, order: number = 0) {
    super(order)
    this.position = Point.zero
    this.framePosition = Point.zero
    this.raster = raster
    this.tileSize = tileSize
    this.frames = (raster.srcRect.width / tileSize.width) * (raster.srcRect.height / tileSize.height)
  }

  get bounds (): Rect {
    return new Rect(this.position, this.tileSize)
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

  getType (): DrawableType {
    return 'raster'
  }

  inPath (p: Point): boolean {
    return this.bounds.intersectsPoint(p)
  }
}
