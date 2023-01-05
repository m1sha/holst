import { Drawable } from '../../../../../src'
import { MouseEventDecorator } from '../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../src/core/events/interactive'
import { Component } from '../../../components/base/component'
import { AppState } from '../../app-state'
import { Tool, ToolNames } from '../tool'
import { SelectEntitiesCommand } from '../../../model/commands/entities/select/select-entities-command'
import { Background } from '../../entities/background'

export class SelectTool extends Tool {
  mousedown (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    e.event.stopPropagation()
    if (drawable instanceof Background) return
    state.sendCommand(component, new SelectEntitiesCommand([drawable.id], 'none'))
  }

  mousemove (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  mouseup (e: InteractiveEvent<MouseEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>) {
    // throw new Error('Method not implemented.')
  }

  get name (): ToolNames { return 'select' }
}
