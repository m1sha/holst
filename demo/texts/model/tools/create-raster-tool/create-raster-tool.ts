import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { IPoint } from '../../../../../src/core/geometry/point'
import { Tool, ToolNames } from '../tool'
import { BrushTool } from './brush-tool'
import { EraserTool } from './eraser-tool'
import { FillTool } from './fill-tool'
import { PenTool } from './pen-tool'
import { PolygonTool } from './polygon-tool'
import { RasterTool, RasterToolNames } from './raster-tool'
import { ShapeTool } from './shape-tool'

export class CreateRasterTool extends Tool {
  private tools: RasterTool[] = []
  private toolName: RasterToolNames = 'pen'
  #startPoint: IPoint | null = null
  #endPoint: IPoint | null = null
  #created: boolean = false

  constructor () {
    super()
    this.tools.push(...[
      new PenTool(),
      new BrushTool(),
      new PolygonTool(),
      new ShapeTool(),
      new FillTool(),
      new EraserTool()
    ])
  }

  get name (): ToolNames { return 'create-raster' }
  get cursor (): MouseCursorTypes { return 'crosshair' }
  get selectedTool (): RasterTool { return this.tools.find(p => p.name === this.toolName)! }
  get created () { return this.#created }
  get startPoint () { return this.#startPoint }
  get endPoint () { return this.#endPoint }
  setTool (name: RasterToolNames) { this.toolName = name }
  hasStartPoint () { return Boolean(this.#startPoint) }
  setStartPoint (point: IPoint) { this.#startPoint = point }
  setEndPoint (point: IPoint) { this.#endPoint = point }
  create () { this.#created = true }
  clear () { this.#startPoint = null }
}
