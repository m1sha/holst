import { Path2DElement } from './path2d-element'

type ElementType = Path2DElement['type']

export class Path2DRecorder {
  private stack: Path2DElement[]

  constructor (stack: Path2DElement[]) {
    this.stack = stack
  }

  get list (): Readonly<Record<number, ElementType>> {
    const result: Record<number, ElementType> = {}
    for (let index = 0; index < this.stack.length; index++) {
      const element = this.stack[index]
      result[index] = element.type
    }
    return result
  }

  get count (): number {
    return this.stack.length
  }

  update (index: number, el: Path2DElement): void {
    const type = this.stack[index].type
    if (type !== el.type) {
      throw new Error(`the types ${type} and ${el.type} of Path2D elements aren't equal`)
    }
    this.stack[index] = { ...el }
  }

  get (index: number): Readonly<Path2DElement> {
    return this.stack[index]
  }

  find (type: ElementType) {
    const items = []
    for (let index = 0; index < this.stack.length; index++) {
      const element = this.stack[index]
      if (element.type === type) items.push({ element, index })
    }
    return items
  }
}
