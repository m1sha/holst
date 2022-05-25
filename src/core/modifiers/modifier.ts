import { Figure } from '../primitives/figure'

export interface Modifier {
  source: any
  action: ((figure: Figure) => void) | null
  execute (): Figure
}
