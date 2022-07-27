import { Rect } from './rect'
import { Anchor } from './anchor'

export type DrawableType = 'shape' | 'text' | 'raster' | 'sprite'
export interface Drawable {
  type: DrawableType
  anchor: Anchor | null
  bounds: Rect
  hidden: boolean
  name: string
}
