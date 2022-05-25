import Shape from '../shape'
import { Figure } from '../primitives/figure'
import { Modifier } from './modifier'

export class Deformation implements Modifier {
  action: ((figure: Figure) => void) | null = null

  source: any = null

  execute (): void {
    if (this.source instanceof Shape) {
      if (!this.action) throw new Error('')
      this.action(this.source.figure)
      return
    }
    throw new Error('Method not implemented.')
  }
}
