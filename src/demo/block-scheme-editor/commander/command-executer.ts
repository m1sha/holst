import { ElementStorage } from '../elements/element-storage'
import { Command } from './command'
import { CreateBlockCommand } from './create-block-command'

export class CommandExecuter {
  private commands: Command[] = []
  private storage: ElementStorage
  private stackPosition = 0

  constructor (storage: ElementStorage) {
    this.storage = storage
  }

  addCommand (command: Command) {
    while (this.stackPosition < this.commands.length) this.commands.pop()
    this.commands.push(command)
    this.stackPosition = this.commands.length
    command.execute(this.storage)
    this.storage.applyChanges()
  }

  undo () {
    if (this.stackPosition <= 0) return
    this.stackPosition--
    const blockIds = this.getBlockUidFromCreateCommands()
    this.storage.removeUnlinked({ blockIds })
    this.recallCommands()
  }

  redo () {
    if (this.stackPosition >= this.commands.length) return
    this.stackPosition++
    this.recallCommands()
  }

  private recallCommands () {
    for (let i = 0; i < this.stackPosition; i++) {
      this.commands[i].execute(this.storage)
    }
    this.storage.applyChanges()
  }

  private getBlockUidFromCreateCommands () {
    const result = []
    for (let i = 0; i < this.stackPosition; i++) {
      const command = this.commands[i]
      if (command instanceof CreateBlockCommand) {
        result.push(command.originUid)
      }
    }
    return result
  }
}
