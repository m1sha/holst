import { Drawable, Point, Shape, TextBlock } from '../../../src'
import { MouseEventDecorator } from '../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../src/core/events/interactive'
import { State } from '../state/state'

export class MovementController {
  private state: State
  private drawables: (Shape | TextBlock)[] = []

  constructor (state: State) {
    this.state = state
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
        this.state.selectedObject = drawable
        this.state.update()
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
        this.state.update()
      })
  }
}

const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)
