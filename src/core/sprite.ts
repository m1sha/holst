import { Size } from './size'
import { Raster } from './raster'
import Orderable from './orderable'
import { IPoint, Point } from './point'
import { Drawable, DrawableType } from './drawable'
import { Rect } from './rect'
import { uid } from '../utils/uid'
import { Container } from './container'
export class Sprite extends Container implements Orderable, Drawable {
  readonly type: DrawableType = 'sprite'
  name: string
  hidden: boolean = false
  id: string
  order: number = 0
  raster: Raster
  tileSize: Size
  readonly frames: number
  position: IPoint
  framePosition: IPoint
  readonly modified: boolean = true
  onModified: (() => void) | null = null

  constructor (raster: Raster, tileSize: Size, order: number = 0) {
    super()
    this.id = uid()
    this.name = 'Sprite'
    this.position = Point.zero
    this.framePosition = Point.zero
    this.raster = raster
    this.tileSize = tileSize
    this.order = order ?? 0
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
}
