import { Figure } from '../primitives/types/figures'

export interface Modifier {
  source: any
  action: ((figure: Figure) => void) | null
  execute (): Figure
}
