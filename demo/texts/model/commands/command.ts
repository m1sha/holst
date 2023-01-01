import { uid } from '../../../../src/utils/uid'
import { MutableAppState } from '../app-state'

export abstract class Command<TData> {
  #executed: boolean = false
  #rolledback: boolean = false
  readonly id: string = uid()
  data: TData | null = null

  execute (appState: MutableAppState): void {
    this.#executed = true
    this.#rolledback = false
  }

  rollback (appState: MutableAppState): void {
    this.#executed = false
    this.#rolledback = true
  }

  get needRegistrate () { return true }

  get canExecuted () { return !this.#executed && !this.#rolledback }
}
