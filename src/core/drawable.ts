import { Rect } from './rect'
import { Anchor } from './anchor'

export type DrawableType = 'shape' | 'text' | 'image'
export interface Drawable {
  type: DrawableType
  anchor: Anchor | null
  bounds: Rect
  hidden: boolean
}
