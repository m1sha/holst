import { CommandExecuter } from './commander/command-executer'
import { CreateBlockCommand } from './commander/create-block-command'
import { MoveBlockCommand } from './commander/move-block-command'
import { SelectBlockCommand } from './commander/select-block-command'
import { UnselectBlockCommand } from './commander/unselect-block-command'
import { Block, CreateBlockOption } from './elements/block'
import { Editor } from './editor'
import { Point } from '../../core/point'

export class CommandController {
  private executer: CommandExecuter
  constructor (editor: Editor) {
    this.executer = new CommandExecuter(editor.storage)
  }

  createBlock (option: CreateBlockOption) {
    this.executer.addCommand(new CreateBlockCommand(option))
  }

  // createArrow () {
  //   this.executer.addCommand({})
  // }

  selectBlock (block: Block) {
    this.executer.addCommand(new SelectBlockCommand(block))
  }

  unselectBlock (block: Block) {
    this.executer.addCommand(new UnselectBlockCommand(block))
  }

  moveBlock (block: Block, x: number, y: number) {
    this.executer.addCommand(new MoveBlockCommand(block, new Point(x, y)))
  }

  undo () {
    this.executer.undo()
  }

  redo () {
    this.executer.redo()
  }
}
