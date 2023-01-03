import { IPoint } from '../../../src/core/geometry/point'
import { MouseCursorTypes } from '../../../src/core/events/mouse-cursor-types'
export type ToolNames = 'select' | 'move' | 'rotate' | 'transform' | 'create-text' | 'create-sketch' | 'create-raster'
export abstract class Tool {
  abstract get name (): ToolNames
  get cursor (): MouseCursorTypes { return 'default' }
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
  get cursor (): MouseCursorTypes { return 'text' }
}

export class CreateSketchTool extends Tool {
  get name (): ToolNames { return 'create-sketch' }
  get cursor (): MouseCursorTypes { return 'crosshair' }
}

export type RasterToolNames = 'pen' | 'brush' | 'polygon' | 'shape' | 'fill' | 'erase'

abstract class RasterTool {
  abstract get name (): RasterToolNames
}

class PenTool extends RasterTool {
  get name (): RasterToolNames { return 'pen' }
}

export class CreateRasterTool extends Tool {
  private tools: RasterTool[] = []
  #startPoint: IPoint | null = null
  #endPoint: IPoint | null = null
  #created: boolean = false

  constructor () {
    super()
    this.tools.push(...[
      new PenTool()
    ])
  }

  get name (): ToolNames { return 'create-raster' }

  get cursor (): MouseCursorTypes { return 'crosshair' }

  get selectedTool (): RasterTool {
    return this.tools[0]
  }

  get created () {
    return this.#created
  }

  get startPoint () {
    return this.#startPoint
  }

  get endPoint () {
    return this.#endPoint
  }

  setTool (name: RasterToolNames) {

  }

  hasStartPoint () {
    return Boolean(this.#startPoint)
  }

  setStartPoint (point: IPoint) {
    this.#startPoint = point
  }

  setEndPoint (point: IPoint) {
    this.#endPoint = point
  }

  create () {
    this.#created = true
  }

  clear () {
    this.#startPoint = null
  }
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
