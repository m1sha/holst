import { Rect } from './rect'
import { Anchor } from './anchor'

export type DrawableType = 'shape' | 'text' | 'raster' | 'sprite'
export interface Drawable {
  id: string
  type: DrawableType
  anchor: Anchor | null
  bounds: Rect
  hidden: boolean
  modified: boolean
  onModified: (() => void) | null
  name: string
}
