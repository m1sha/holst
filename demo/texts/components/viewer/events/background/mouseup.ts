import { MouseEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { CreateRasterCommand } from '../../../../model/commands/create-raster-command'
import { CreateRasterTool } from '../../../../model/tool'
import { Viewer } from '../../viewer'

export function onBackgroundMouseup (e: InteractiveEvent<MouseEventDecorator>, state: AppState, viewer: Viewer) {
  if (state.selectedTool.name !== 'create-raster') return
  const tool = state.selectedTool as CreateRasterTool
  if (!tool.created) {
    tool.create()
    state.sendCommand(viewer, new CreateRasterCommand(tool.startPoint!, tool.endPoint!))
    tool.clear()
  }
}
