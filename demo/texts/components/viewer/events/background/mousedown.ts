import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { CreateRasterTool } from '../../../../model/tools/create-tools/create-raster-tool'
import { Viewer } from '../../viewer'

export function onBackgroundMousedown (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer) {
  if (state.selectedTool.name !== 'create-raster') return
  const tool = state.selectedTool as CreateRasterTool

  if (tool.hasStartPoint()) return

  tool.setStartPoint({ x: e.event.origin.offsetX, y: e.event.origin.offsetY })
  // state.sendCommand()
}
