import { Drawable } from '../../../../../src'
import { KeyboardEventDecorator, MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { IPoint } from '../../../../../src/core/geometry/point'
import { Component } from '../../../components/base/component'
import { AppState } from '../../app-state'
import { DrawFrameRectCommand } from '../../commands/draw-frame-rect-command'
import { CreateRasterCommand } from '../../commands/create/create-raster-command'
import { SelectLastEntityCommand } from '../../commands/entities/select/select-last-entity-command'
import { Tool, ToolNames } from '../tool'
import { CancelDrawFrameRectCommand } from '../../commands/cancel-draw-frame-rect-command'

export class CreateRasterTool extends Tool {
  mousedown (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    if (this.hasStartPoint()) return

    this.setStartPoint({ x: e.event.origin.offsetX, y: e.event.origin.offsetY })
  }

  mousemove (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    if (!this.hasStartPoint()) return

    this.setEndPoint({ x: e.event.origin.offsetX, y: e.event.origin.offsetY })

    state.sendCommand(component, new DrawFrameRectCommand(this.startPoint!, this.endPoint!))
  }

  mouseup (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    if (!this.created) {
      this.create()
      state.sendCommand(component, new CreateRasterCommand(this.startPoint!, this.endPoint!))
      state.sendCommand(component, new SelectLastEntityCommand())
      this.clear()
    }
  }

  keydown (e: InteractiveEvent<KeyboardEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>): void {
    const key = e.event.origin.key.toLowerCase()
    if (key === 'escape') state.sendCommand(state, new CancelDrawFrameRectCommand())
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
