import { Drawable, IPoint, Point, Shape, TextBlock } from '../../../../../src'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { AppState } from '../../../model/app-state'
import { CreateInputTextCommand } from '../../../model/commands/create-input-text-command'
import { EndMoveEntitiesCommand } from '../../../model/commands/end-move-entities-command'
// import { CreateTextCommand } from '../../../model/commands/create-text-command'
import { MoveEntitiesCommand } from '../../../model/commands/move-entities-command'
import { SelectEntitiesCommand } from '../../../model/commands/select-entities-command'
import { StartMoveEntitiesCommand } from '../../../model/commands/start-move-entities-command'
import { Viewer } from '../viewer'

export class MovementController {
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
    background
      .on('click', e => {
        if (this.state.selectedTool.name === 'create-text') {
          const point = new Point(e.event.origin.x, e.event.origin.y)
          const offsetPoint = new Point(e.event.origin.offsetX, e.event.origin.offsetY)
          this.state.sendCommand(this.viewer, new CreateInputTextCommand(point, offsetPoint))
        }
      })
  }

  private setEntityEvents (drawable: Drawable) {
    let delta = Point.zero
    drawable
      .on('hover', e => { e.cursor = 'pointer' })
      .on('leave', e => { e.cursor = 'default' })
      .on('mousedown', e => {
        e.event.stopPropagation()
        this.state.sendCommand(this.viewer, new SelectEntitiesCommand([drawable.id], 'none'))
        this.state.sendCommand(this.viewer, new StartMoveEntitiesCommand([drawable.id]))
        delta = new Point(drawable.bounds).dec(getPoint(e))
      })
      .on('mousemove', e => {
        if (!e.event.pressed) return
        e.cursor = 'move'
        const p = getPoint(e)
        if (drawable instanceof TextBlock) {
          drawable.target.x = delta.x + p.x
          drawable.target.y = delta.y + p.y
          this.state.sendCommand(this.viewer, new MoveEntitiesCommand([drawable.id], drawable.target))
        }
        if (drawable instanceof Shape) {
          const target = drawable.figures.first() as IPoint
          target.x = delta.x + p.x
          target.y = delta.y + p.y
          this.state.sendCommand(this.viewer, new MoveEntitiesCommand([drawable.id], target))
        }
      })
      .on('mouseup', e => {
        delta = Point.zero
        // getPoint(e)
        e.cursor = 'pointer'
        // this.state.update()
        this.state.sendCommand(this.viewer, new EndMoveEntitiesCommand([drawable.id]))
      })
  }
}

const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)
