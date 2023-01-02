import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { DrawFrameRectCommand } from '../../../../model/commands/draw-frame-rect-command'
import { CreateRasterTool } from '../../../../model/tool'
import { Viewer } from '../../viewer'

export function onBackgroundMousemove (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer) {
  if (state.selectedTool.name !== 'create-raster') return
  const tool = state.selectedTool as CreateRasterTool

  if (!tool.hasStartPoint()) return

  tool.setEndPoint({ x: e.event.origin.offsetX, y: e.event.origin.offsetY })

  state.sendCommand(viewer, new DrawFrameRectCommand(tool.startPoint!, tool.endPoint!))
}
