import { Drawable, Shape, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { onBackgroundClick } from './events/background/click'
import { onBackgroundKeydown } from './events/background/keydown'
import { onBackgroundMousedown } from './events/background/mousedown'
import { onBackgroundMousemove } from './events/background/mousemove'
import { onBackgroundMouseup } from './events/background/mouseup'
import { Viewer } from './viewer'

// type Delta = Record<string, Point>

export class ActionController {
  private state: AppState
  private viewer: Viewer
  private drawables: (Shape | TextBlock)[] = []
  // private delta: Delta

  constructor (state: AppState, viewer: Viewer) {
    this.state = state
    this.viewer = viewer
    // this.delta = {}
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
      .on('mouseup', e => onBackgroundMouseup(e, this.state, this.viewer))
      .on('mousemove', e => onBackgroundMousemove(e, this.state, this.viewer))
      .on('mousedown', e => onBackgroundMousedown(e, this.state, this.viewer))
      .on('keydown', e => onBackgroundKeydown(e, this.state, this.viewer))
  }

  private setEntityEvents (drawable: Drawable) {
    drawable
      // .on('hover', e => { e.cursor = 'pointer' })
      // .on('leave', e => { e.cursor = this.state.defaultCursor })
      .on('mousedown', e => this.state.selectedTool.mousedown(e, drawable, this.state, this.viewer))
      .on('mousemove', e => this.state.selectedTool.mousemove(e, drawable, this.state, this.viewer))
      .on('mouseup', e => this.state.selectedTool.mouseup(e, drawable, this.state, this.viewer))
  }
}
