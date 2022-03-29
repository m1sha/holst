import { Block } from './block'

export class ElementFactory {
  private static elements = 0
  static createActionBlock (): Block {
    this.elements++
    return new Block(this.elements, 'action')
  }
}
