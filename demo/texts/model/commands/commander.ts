import { Drawable } from '../../../../src'
import { MutableAppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'
import { MoveEntitiesCommand } from './move-entities-command'

export class Commander {
  #commands: Command<Entity<Drawable>>[] = []
  #heap: number = 0

  add (command: Command<Entity<Drawable>>) {
    if (!command.needRegistrate) return

    if (this.#commands[this.#commands.length - 1] instanceof MoveEntitiesCommand && command instanceof MoveEntitiesCommand) {
      this.#commands[this.#commands.length - 1].data = command.data
      return
    }

    if (this.#heap > this.#commands.length) {
      while (this.#heap > this.#commands.length) {
        this.#commands.pop()
      }
    }
    this.#commands.push(command)
    this.#heap++

    console.dir(command)
  }

  undo (state: MutableAppState) {
    if (this.#heap - 1 < 0) return
    const command = this.#commands[this.#heap - 1]
    command.rollback(state)
    this.#heap--
  }

  redo (state: MutableAppState) {
    if (this.#heap + 1 > this.#commands.length) return
    this.#heap++
    const command = this.#commands[this.#heap - 1]
    command.execute(state)
  }
}
