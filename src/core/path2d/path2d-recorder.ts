import { Path2DElement } from './path2d-element'

type ElementType = Path2DElement['type']

export class Path2DRecorder {
  private stack: Path2DElement[]

  constructor (stack: Path2DElement[]) {
    this.stack = stack
  }

  find (type: ElementType) {
    return this.stack.filter(p => p.type === type)
  }
}
