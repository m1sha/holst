import { Drawable } from '../../../../src'
import { MutableAppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'
import { MoveEntitiesCommand } from './entities/moves/move-entities-command'

export class Commander {
  #commands: Command<Entity<Drawable>>[] = []
  #heap: number = 0

  has (command: Command<Entity<Drawable>>): boolean {
    return this.#commands.some(p => p.id === command.id)
  }

  add (command: Command<Entity<Drawable>>): void {
    if (!command.needRegistrate) return

    if (this.lastCommand instanceof MoveEntitiesCommand && command instanceof MoveEntitiesCommand) {
      this.lastCommand.data = command.data
      return
    }

    if (this.#heap > this.#commands.length) {
      while (this.#heap > this.#commands.length) {
        this.#commands.pop()
      }
    }
    this.#commands.push(command)
    this.#heap = this.#commands.length

    console.dir(command)
  }

  undo (state: MutableAppState) {
    if (this.#heap - 1 < 0) return
    const command = this.command
    command.rollback(state)
    this.#heap--
  }

  redo (state: MutableAppState) {
    if (this.#heap + 1 > this.#commands.length) return
    this.#heap++
    const command = this.command
    command.execute(state)
  }

  get command () {
    return this.#commands[this.#heap - 1]
  }

  private get lastCommand () {
    return this.#commands[this.#commands.length - 1]
  }
}
