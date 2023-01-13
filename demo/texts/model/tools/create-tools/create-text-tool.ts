import { Drawable, Point } from '../../../../../src'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { MouseCursorTypes } from '../../../../../src/core/events/mouse-cursor-types'
import { Component } from '../../../components/base/component'
import { AppState } from '../../app-state'
import { CreateInputTextCommand } from '../../commands/create/create-input-text-command'
import { Tool, ToolNames } from '../tool'

export class CreateTextTool extends Tool {
  mousedown (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    const point = new Point(e.event.origin.x, e.event.origin.y)
    const offsetPoint = new Point(e.event.origin.offsetX, e.event.origin.offsetY)
    state.sendCommand(component, new CreateInputTextCommand(point, offsetPoint))
  }

  mousemove (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  mouseup (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  get name (): ToolNames { return 'create-text' }
  get cursor (): MouseCursorTypes { return 'text' }
}
