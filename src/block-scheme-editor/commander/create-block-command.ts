import { Block, CreateBlockOption } from '../elements/block'
import { Editor } from '../editor'
import { Command } from './command'
import { ElementFactory } from '../elements/element-factory'

export class CreateBlockCommand implements Command {
  private option: CreateBlockOption
  private id: number = 0
  private block: Block = null
  constructor (option: CreateBlockOption) {
    this.option = option
  }

  execute (editor: Editor) {
    if (!this.block) {
      this.block = ElementFactory.createActionBlock()
      this.id = this.block._uid
    }

    this.block.position = this.option.position
    this.block.text = this.option.text
    this.block.selected = false
    this.block.hovered = false
    editor.storage.addBlock(this.block)
  }

  get originUid () {
    return this.id
  }
}
