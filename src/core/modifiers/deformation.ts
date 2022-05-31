import Shape from '../shape'
import { Figure } from '../primitives/types/figures'
import { Modifier } from './modifier'

export class Deformation implements Modifier {
  constructor (action?: ((figure: Figure) => void), source?: any) {
    if (action) this.action = action
    if (source) this.source = source
  }

  action: ((figure: Figure) => void) | null = null
  source: any = null

  execute (): Figure {
    if (this.source instanceof Shape) {
      if (!this.action) throw new Error('')
      const f = this.source.figure
      this.action(f)
      return f
    }
    throw new Error('Method not implemented.')
  }
}
