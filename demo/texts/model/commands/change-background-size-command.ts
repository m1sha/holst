import { Shape, Size } from '../../../../src'
import { Command } from './command'

export class ChangeBackgroundSizeCommand extends Command<Size> {
  constructor (size: Size) {
    super()
    this.data = size
  }

  invoke (shape: Shape) {
    if (!this.data) return
    const rect = shape.rects[0]
    rect.height = this.data.height
    rect.width = this.data.width
  }
}
