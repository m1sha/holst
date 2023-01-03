import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { IPoint } from '../../../../../src/core/geometry/point'
import { Tool, ToolNames } from '../tool'

export class CreateRasterTool extends Tool {
  #startPoint: IPoint | null = null
  #endPoint: IPoint | null = null
  #created: boolean = false

  get name (): ToolNames { return 'create-raster' }
  get cursor (): MouseCursorTypes { return 'crosshair' }
  get created () { return this.#created }
  get startPoint () { return this.#startPoint }
  get endPoint () { return this.#endPoint }
  hasStartPoint () { return Boolean(this.#startPoint) }
  setStartPoint (point: IPoint) { this.#startPoint = point }
  setEndPoint (point: IPoint) { this.#endPoint = point }
  create () { this.#created = true }
  clear () { this.#startPoint = null }
}
