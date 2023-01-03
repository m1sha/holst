import { Tool, ToolNames } from './tool'
import { SelectTool } from './manipulation-tools/select-tool'
import { MoveTool } from './manipulation-tools/move-tool'
import { RotateTool } from './manipulation-tools/rotate-tool'
import { TransformTool } from './manipulation-tools/transform-tool'
import { CreateTextTool } from './create-tools/create-text-tool'
import { CreateSketchTool } from './create-tools/create-sketch-tool'
import { CreateRasterTool } from './create-tools/create-raster-tool'
import { BrushTool } from './raster-tools/brush-tool'
import { EraserTool } from './raster-tools/eraser-tool'
import { FillTool } from './raster-tools/fill-tool'
import { PenTool } from './raster-tools/pen-tool'
import { PolygonTool } from './raster-tools/polygon-tool'
import { ShapeTool } from './raster-tools/shape-tool'

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
      new CreateRasterTool(),
      new PenTool(),
      new BrushTool(),
      new PolygonTool(),
      new ShapeTool(),
      new FillTool(),
      new EraserTool()
    ])
  }

  getByName <T extends Tool> (name: ToolNames) {
    return this.tools.find(p => p.name === name)! as T
  }
}
