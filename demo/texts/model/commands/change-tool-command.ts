import { Tool } from '../tool'
import { Command } from './command'

export class ChangeToolCommand extends Command<Tool> {
  constructor (tool: Tool) {
    super()
    this.data = tool
  }
}
