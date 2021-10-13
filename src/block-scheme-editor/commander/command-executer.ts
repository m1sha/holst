import { Editor } from '../editor'
import { Command } from './command'
import { CreateBlockCommand } from './create-block-command'

export class CommandExecuter {
  private commands: Command[] = []
  private env: Editor
  private stackPosition = 0

  constructor (environment: Editor) {
    this.env = environment
  }

  addCommand (command: Command) {
    while (this.stackPosition < this.commands.length) this.commands.pop()
    this.commands.push(command)
    this.stackPosition = this.commands.length
    command.execute(this.env)
    this.env.update()
  }

  undo () {
    if (this.stackPosition <= 0) return
    this.stackPosition--
    const links = this.getBlockLinks()
    this.env.garbageCollector(links)
    this.recallCommands()
  }

  redo () {
    if (this.stackPosition >= this.commands.length) return
    this.stackPosition++
    this.recallCommands()
  }

  private recallCommands () {
    for (let i = 0; i < this.stackPosition; i++) {
      this.commands[i].execute(this.env)
    }
    this.env.update()
  }

  private getBlockLinks () {
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
