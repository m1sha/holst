import { IPoint } from '../../../../src/core/geometry/point'
import { MutableAppState } from '../app-state'
import { Command } from './command'

export type FrameRect = { p1: IPoint, p2: IPoint }

export class DrawFrameRectCommand extends Command<FrameRect> {
  constructor (p1: IPoint, p2: IPoint) {
    super()
    this.data = { p1, p2 }
  }

  execute (appState: MutableAppState): void {
    appState.scene().actionLayer.clear()
    appState.scene().actionLayer.createShape('select-frame')
      .moveTo(this.data!.p1)
      .lineTo({ x: this.data!.p2.x, y: this.data!.p1.y })
      .lineTo({ x: this.data!.p2.x, y: this.data!.p2.y })
      .lineTo({ x: this.data!.p1.x, y: this.data!.p2.y })
      .closePath()
    super.execute(appState)
  }
}
