import { Drawable, Point, Shape, TextBlock } from '../../../../../src'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { AppState } from '../../../model/app-state'
import { SelectEntitiesCommand } from '../../../model/commands/select-entities-command'
import { Viewer } from '../viewer'

export class MovementController {
  private state: AppState
  private viewer: Viewer
  private drawables: (Shape | TextBlock)[] = []

  constructor (state: AppState, viewer: Viewer) {
    this.state = state
    this.viewer = viewer
  }

  add (drawable: Shape | TextBlock) {
    this.drawables.push(drawable)
    this.setEvents(drawable)
  }

  private setEvents (drawable: Drawable) {
    let delta = Point.zero
    drawable
      .on('hover', e => { e.cursor = 'pointer' })
      .on('leave', e => { e.cursor = 'default' })
      .on('mousedown', e => {
        this.state.sendCommand(this.viewer, new SelectEntitiesCommand([drawable.id], 'none'))
        delta = new Point(drawable.bounds).dec(getPoint(e))
      })
      .on('mousemove', e => {
        if (!e.event.pressed) return
        e.cursor = 'move'
        const p = getPoint(e)
        const t = drawable as TextBlock
        t.target.x = delta.x + p.x
        t.target.y = delta.y + p.y
      })
      .on('mouseup', e => {
        delta = Point.zero
        // getPoint(e)
        e.cursor = 'pointer'
        // this.state.update()
      })
  }
}

const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)
