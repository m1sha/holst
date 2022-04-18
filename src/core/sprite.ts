import { Size } from './size'
import { Bitmap } from './bitmap'

export class Sprite {
  bitmap: Bitmap
  tileSize: Size
  constructor (bitmap: Bitmap, tileSize: Size) {
    this.bitmap = bitmap
    this.tileSize = tileSize
  }
}
