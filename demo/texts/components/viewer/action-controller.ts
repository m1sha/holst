import { Drawable, Point, Shape, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { onBackgroundClick } from './events/background/click'
import { onBackgroundKeydown } from './events/background/keydown'
import { onEntityMousedown } from './events/entity/mousedown'
import { onEntityMousemove } from './events/entity/mousemove'
import { onEntityMouseup } from './events/entity/mouseup'
import { Viewer } from './viewer'

type Delta = Record<string, Point>

export class ActionController {
  private state: AppState
  private viewer: Viewer
  private drawables: (Shape | TextBlock)[] = []
  private delta: Delta

  constructor (state: AppState, viewer: Viewer) {
    this.state = state
    this.viewer = viewer
    this.delta = {}
    this.setBackgroundEvents()
  }

  add (drawable: Shape | TextBlock) {
    this.drawables.push(drawable)
    this.setEntityEvents(drawable)
  }

  private setBackgroundEvents () {
    const background = this.state.background
    background
      .on('click', e => onBackgroundClick(e, this.state, this.viewer))
      .on('keydown', e => onBackgroundKeydown(e, this.state, this.viewer))
  }

  private setEntityEvents (drawable: Drawable) {
    drawable
      .on('hover', e => { e.cursor = 'pointer' })
      .on('leave', e => { e.cursor = 'default' })
      .on('mousedown', e => onEntityMousedown(e, this.state, this.viewer, drawable, this.delta))
      .on('mousemove', e => onEntityMousemove(e, this.state, this.viewer, drawable, this.delta))
      .on('mouseup', e => onEntityMouseup(e, this.state, this.viewer, drawable, this.delta))
  }
}
