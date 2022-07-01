import { Drawable } from './drawable'

export class Anchor {
  container: Drawable | null = null
  dock: 'none' | 'top' | 'bottom' | 'left' | 'right' /* | 'fill' */ = 'none'
}
