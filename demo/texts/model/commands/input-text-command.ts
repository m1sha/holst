import { Command } from './command'

export class InputTextCommand extends Command<string> {
  constructor (value: string) {
    super()
    this.data = value
  }
}
