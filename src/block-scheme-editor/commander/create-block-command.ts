import { Block, CreateBlockOption } from '../elements/block'
import { Environment } from '../environment'
import { Command } from './command'

export class CreateBlockCommand implements Command {
  private origin: Block
  private option: CreateBlockOption
  constructor (origin: Block, option: CreateBlockOption) {
    this.origin = origin
    this.option = option
  }

  execute (environment: Environment) {
    this.origin.position = this.option.position
    this.origin.text = this.option.text
    environment.addBlock(this.origin)
  }
}
