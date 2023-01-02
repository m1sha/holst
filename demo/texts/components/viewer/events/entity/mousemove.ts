import { IPoint, Point } from '../../../../../../src/core/geometry/point'
import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { Viewer } from '../../viewer'
import { Drawable } from '../../../../../../src/core/drawable'
import { TextBlock } from '../../../../../../src/core/label'
import Shape from '../../../../../../src/core/shape'
import { MoveEntitiesCommand } from '../../../../model/commands/move-entities-command'
import { Raster } from '../../../../../../src/core/raster'

type Delta = Record<string, Point>
const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)

export function onEntityMousemove (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer, drawable: Drawable, delta: Delta) {
  if (!e.event.pressed) return

  const p = getPoint(e)
  const d = delta[drawable.id]

  const name = state.selectedTool.name
  switch (name) {
    case 'move': {
      e.cursor = 'move'
      if (drawable instanceof TextBlock) {
        drawable.target.x = d.x + p.x
        drawable.target.y = d.y + p.y
        state.sendCommand(viewer, new MoveEntitiesCommand([drawable.id], drawable.target))
      }
      if (drawable instanceof Shape) {
        const target = drawable.figures.first() as IPoint
        target.x = d.x + p.x
        target.y = d.y + p.y
        state.sendCommand(viewer, new MoveEntitiesCommand([drawable.id], target))
      }
      if (drawable instanceof Raster) {
        drawable.distRect.x = d.x + p.x
        drawable.distRect.y = d.y + p.y
        state.sendCommand(viewer, new MoveEntitiesCommand([drawable.id], drawable.distRect))
      }
      break
    }
  }
}
