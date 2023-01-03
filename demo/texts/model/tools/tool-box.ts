import { Tool, ToolNames } from './tool'
import { SelectTool } from './select-tool'
import { MoveTool } from './move-tool'
import { RotateTool } from './rotate-tool'
import { TransformTool } from './transform-tool'
import { CreateTextTool } from './create-text-tool'
import { CreateSketchTool } from './create-sketch-tool'
import { CreateRasterTool } from './create-raster-tool/create-raster-tool'

export class ToolBox {
  private tools: Tool[] = []

  constructor () {
    this.tools.push(...[
      new SelectTool(),
      new MoveTool(),
      new RotateTool(),
      new TransformTool(),
      new CreateTextTool(),
      new CreateSketchTool(),
      new CreateRasterTool()
    ])
  }

  getByName <T extends Tool> (name: ToolNames) {
    return this.tools.find(p => p.name === name)! as T
  }
}
