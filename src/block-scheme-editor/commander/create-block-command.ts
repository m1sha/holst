import { Block, CreateBlockOption } from '../elements/block'
import { Editor } from '../editor'
import { Command } from './command'

export class CreateBlockCommand implements Command {
  private origin: Block
  private option: CreateBlockOption
  constructor (origin: Block, option: CreateBlockOption) {
    this.origin = origin
    this.option = option
  }

  execute (editor: Editor) {
    this.origin.position = this.option.position
    this.origin.text = this.option.text
    this.origin.selected = false
    this.origin.hovered = false
    editor.storage.addBlock(this.origin)
  }

  get originUid () {
    return this.origin._uid
  }
}
