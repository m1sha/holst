import { Point } from '../../../../../../src/core/geometry/point'
import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { Viewer } from '../../viewer'
import { Drawable } from '../../../../../../src/core/drawable'
import { EndMoveEntitiesCommand } from '../../../../model/commands/entities/moves/end-move-entities-command'

type Delta = Record<string, Point>
// const getPoint = (e: InteractiveEvent<MouseEventDecorator>) => new Point(e.event.origin.offsetX, e.event.origin.offsetY)

export function onEntityMouseup (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer, drawable: Drawable, delta: Delta) {
  if (!e.event.pressed) return

  // const p = getPoint(e)
  delete delta[drawable.id]

  const name = state.selectedTool.name
  switch (name) {
    case 'move': {
      e.cursor = 'pointer'
      state.sendCommand(viewer, new EndMoveEntitiesCommand([drawable.id]))
      break
    }
  }
}
