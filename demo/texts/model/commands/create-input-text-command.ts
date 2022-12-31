import { IPoint } from '../../../../src'
import { MutableAppState } from '../app-state'
import { Command } from './command'

export class CreateInputTextCommand extends Command<IPoint[]> {
  constructor (point: IPoint, offsetPoint: IPoint) {
    super()
    this.data = [point, offsetPoint]
  }

  execute (appState: MutableAppState): void {
    appState.setCurrentTextPosition(this.data![1])
  }

  rollback (appState: MutableAppState): void {
    throw new Error('Method not implemented.')
  }
}
