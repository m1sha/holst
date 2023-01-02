import { IPoint } from '../../../../src/core/geometry/point'
import { MutableAppState } from '../app-state'
import { Command } from './command'

export type FrameRect = { p1: IPoint, p2: IPoint }

export class CreateRasterCommand extends Command<FrameRect> {
  constructor (p1: IPoint, p2: IPoint) {
    super()
    this.data = { p1, p2 }
  }

  execute (appState: MutableAppState): void {
    appState.scene().actionLayer.clear()
    super.execute(appState)
  }
}
