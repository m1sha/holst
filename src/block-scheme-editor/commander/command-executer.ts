import { Environment } from '../environment'
import { Command } from './command'

export class CommandExecuter {
  private commands: Command[] = []
  private env: Environment
  private stackPosition = 0

  constructor (environment: Environment) {
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
}
