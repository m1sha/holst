import { Block } from '../elements/block'
import { Command } from './command'

export class UnselectBlockCommand implements Command {
    private block: Block
    constructor (block: Block) {
      this.block = block
    }

    execute () {
      this.block.selected = false
    }
}
