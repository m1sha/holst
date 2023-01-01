import { Point } from '../../../../../../src/core/geometry/point'
import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { Viewer } from '../../viewer'
import { Drawable } from '../../../../../../src/core/drawable'
import { SelectEntitiesCommand } from '../../../../model/commands/select-entities-command'
import { StartMoveEntitiesCommand } from '../../../../model/commands/start-move-entities-command'

type Delta = Record<string, Point>
const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)

export function onEntityMousedown (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer, drawable: Drawable, delta: Delta) {
  e.event.stopPropagation()
  delta[drawable.id] = new Point(drawable.bounds).dec(getPoint(e))

  state.sendCommand(viewer, new SelectEntitiesCommand([drawable.id], 'none'))

  const name = state.selectedTool.name
  switch (name) {
    case 'move': {
      state.sendCommand(viewer, new StartMoveEntitiesCommand([drawable.id]))
      break
    }
  }
}
