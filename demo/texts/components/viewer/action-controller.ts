import { Drawable, Shape, TextBlock } from '../../../../src'
import { AppState } from '../../model/app-state'
import { defaultKeyboardEvent } from '../../model/default-keyboard-event'
import { Viewer } from './viewer'

export class ActionController {
  private state: AppState
  private viewer: Viewer
  private drawables: (Shape | TextBlock)[] = []

  constructor (state: AppState, viewer: Viewer) {
    this.state = state
    this.viewer = viewer
    this.setBackgroundEvents()
  }

  add (drawable: Shape | TextBlock) {
    this.drawables.push(drawable)
    this.setEntityEvents(drawable)
  }

  private setBackgroundEvents () {
    const background = this.state.background
    background.shape
      .on('click', e => this.state.selectedTool.click(e, background, this.state, this.viewer))
      .on('mouseup', e => this.state.selectedTool.mouseup(e, background, this.state, this.viewer))
      .on('mousemove', e => this.state.selectedTool.mousemove(e, background, this.state, this.viewer))
      .on('mousedown', e => this.state.selectedTool.mousedown(e, background, this.state, this.viewer))
      .on('keydown', e => {
        if (defaultKeyboardEvent(e, background, this.state, this.viewer)) return
        this.state.selectedTool.keydown(e, background, this.state, this.viewer)
      })
  }

  private setEntityEvents (drawable: Drawable) {
    drawable
      // .on('hover', e => { e.cursor = 'pointer' })
      // .on('leave', e => { e.cursor = this.state.defaultCursor })
      .on('click', e => e.event.stopPropagation())
      .on('mousedown', e => this.state.selectedTool.mousedown(e, drawable, this.state, this.viewer))
      .on('mousemove', e => this.state.selectedTool.mousemove(e, drawable, this.state, this.viewer))
      .on('mouseup', e => this.state.selectedTool.mouseup(e, drawable, this.state, this.viewer))
  }
}
