
export type ToolNames = 'select' | 'move' | 'rotate' | 'transform' | 'create-text' | 'create-sketch' | 'create-raster'
export abstract class Tool {
  abstract get name (): ToolNames
}

export class SelectTool extends Tool {
  get name (): ToolNames { return 'select' }
}

export class MoveTool extends Tool {
  get name (): ToolNames { return 'move' }
}

export class RotateTool extends Tool {
  get name (): ToolNames { return 'rotate' }
}

export class TransformTool extends Tool {
  get name (): ToolNames { return 'transform' }
}

export class CreateTextTool extends Tool {
  get name (): ToolNames { return 'create-text' }
}

export class CreateSketchTool extends Tool {
  get name (): ToolNames { return 'create-sketch' }
}

export class CreateRasterTool extends Tool {
  get name (): ToolNames { return 'create-raster' }
}

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
