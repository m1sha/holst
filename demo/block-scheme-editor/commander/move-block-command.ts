import { Point } from '../../../src/core/point'
import { Block } from '../elements/block'
import { Command } from './command'

export class MoveBlockCommand implements Command {
    private block: Block
    private position: Point
    constructor (block: Block, position: Point) {
      this.block = block
      this.position = position
    }

    execute () {
      this.block.position = this.position
    }
}
