import { Drawable } from '../../../../../src'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { IPoint } from '../../../../../src/core/geometry/point'
import { Component } from '../../../components/base/component'
import { AppState } from '../../app-state'
import { Tool, ToolNames } from '../tool'

export class CreateRasterTool extends Tool {
  mousedown (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  mousemove (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  mouseup (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

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
