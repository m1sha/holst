import { Point } from '../../../../../../src/core/geometry/point'
import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { CreateInputTextCommand } from '../../../../model/commands/create/create-input-text-command'
import { AppState } from '../../../../model/app-state'
import { Viewer } from '../../viewer'

export function onBackgroundClick (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer) {
  const name = state.selectedTool.name
  switch (name) {
    case 'create-text': {
      const point = new Point(e.event.origin.x, e.event.origin.y)
      const offsetPoint = new Point(e.event.origin.offsetX, e.event.origin.offsetY)
      state.sendCommand(viewer, new CreateInputTextCommand(point, offsetPoint))
      break
    }
  }
}
