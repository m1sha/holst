import { Drawable } from '../../../../../src/core/drawable'
import { IPoint, Point } from '../../../../../src/core/geometry/point'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { Component } from '../../../components/base/component'
import { AppState } from '../../app-state'
import { Tool, ToolNames } from '../tool'
import { StartMoveEntitiesCommand } from '../../../model/commands/entities/moves/start-move-entities-command'
import { TextBlock } from '../../../../../src/core/label'
import Shape from '../../../../../src/core/shape'
import { Raster } from '../../../../../src/core/raster'
import { MoveEntitiesCommand } from '../../commands/entities/moves/move-entities-command'
import { EndMoveEntitiesCommand } from '../../commands/entities/moves/end-move-entities-command'
import { Background } from '../../entities/background'

type Delta = Record<string, Point>
const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)

export class MoveTool extends Tool {
  private delta: Delta = {}

  mousedown (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    e.event.stopPropagation()
    if (drawable instanceof Background) return
    this.delta[drawable.id] = new Point(drawable.bounds).dec(getPoint(e))
    state.sendCommand(component, new StartMoveEntitiesCommand([drawable.id]))
  }

  mousemove (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    if (!e.event.pressed) return

    const p = getPoint(e)
    const d = this.delta[drawable.id]
    // e.cursor = 'move'
    if (drawable instanceof TextBlock) {
      drawable.target.x = d.x + p.x
      drawable.target.y = d.y + p.y
      state.sendCommand(component, new MoveEntitiesCommand([drawable.id], drawable.target))
    }
    if (drawable instanceof Shape) {
      const target = drawable.figures.first() as IPoint
      target.x = d.x + p.x
      target.y = d.y + p.y
      state.sendCommand(component, new MoveEntitiesCommand([drawable.id], target))
    }
    if (drawable instanceof Raster) {
      drawable.distRect.x = d.x + p.x
      drawable.distRect.y = d.y + p.y
      state.sendCommand(component, new MoveEntitiesCommand([drawable.id], drawable.distRect))
    }
  }

  mouseup (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    if (!e.event.pressed) return

    delete this.delta[drawable.id]
    state.sendCommand(component, new EndMoveEntitiesCommand([drawable.id]))
  }

  get name (): ToolNames { return 'move' }
}
