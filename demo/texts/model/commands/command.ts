import { MutableAppState } from '../app-state'

export abstract class Command<TData> {
  data: TData | null = null

  abstract execute (appState: MutableAppState): void

  abstract rollback (appState: MutableAppState): void
}
