import { MutableAppState } from '../app-state'
import { CreateRasterTool } from '../tools/create-raster-tool/create-raster-tool'
import { RasterToolNames } from '../tools/create-raster-tool/raster-tool'
import { Command } from './command'

export class ChangeRasterToolCommand extends Command<RasterToolNames> {
  private previousTool: RasterToolNames | null = null
  constructor (toolName: RasterToolNames) {
    super()
    this.data = toolName
  }

  execute (appState: MutableAppState): void {
    if (appState.selectedTool()?.name !== 'create-raster') return
    const t = appState.selectedTool() as CreateRasterTool
    this.previousTool = t.selectedTool.name
    appState.setRasterTool(this.data!)
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    appState.setRasterTool(this.previousTool!)
    super.rollback(appState)
  }
}
