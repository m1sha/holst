import { Drawable, Point, Shape, TextBlock } from '../../../src'
import { MouseEventDecorator } from '../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../src/core/events/interactive'

export class MovementController {
  private drawables: (Shape | TextBlock)[] = []
  selected: Drawable | null = null
  onUpdate: (() => void) | null = null
  onDrawableChanged: (() => void) | null = null

  add (drawable: Shape | TextBlock) {
    this.drawables.push(drawable)
    this.setEvents(drawable)
  }

  private setEvents (drawable: Drawable) {
    drawable
      .on('hover', e => { e.cursor = 'pointer' })
      .on('leave', e => { e.cursor = 'default' })
      .on('mousedown', e => {
        this.selected = drawable
        if (this.onDrawableChanged) this.onDrawableChanged()
        getPoint(e)
      })
      .on('mousemove', e => {
        if (!e.event.pressed) return
        e.cursor = 'move'
        const p = getPoint(e)
        const t = drawable as TextBlock
        t.target.x = p.x
        t.target.y = p.y
      })
      .on('mouseup', e => {
        getPoint(e)
        e.cursor = 'pointer'
        if (this.onUpdate) this.onUpdate()
      })
  }
}

const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)
