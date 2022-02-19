import { Block, CreateBlockOption } from '../elements/block'
import { Command } from './command'
import { ElementFactory } from '../elements/element-factory'
import { ElementStorage } from '../elements/element-storage'

export class CreateBlockCommand implements Command {
  private option: CreateBlockOption
  private id: number = 0
  private block: Block | null = null
  constructor (option: CreateBlockOption) {
    this.option = option
  }

  execute (storage: ElementStorage) {
    if (!this.block) {
      this.block = ElementFactory.createActionBlock()
      this.id = this.block._uid
    }

    this.block.position = this.option.position
    this.block.text = this.option.text
    this.block.selected = false
    this.block.hovered = false
    storage.addBlock(this.block)
  }

  get originUid () {
    return this.id
  }
}
