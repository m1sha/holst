import { Drawable } from '../../../src'
import { KeyboardEventDecorator } from '../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../src/core/events/interactive'
import { Component } from '../components/base/component'
import { AppState } from './app-state'
import { ChangeToolCommand } from './commands/change-tool-command'
import { ToolNames } from './tools/tool'

export function defaultKeyboardEvent (e: InteractiveEvent<KeyboardEventDecorator>, drawable: Drawable, state: AppState, component: Component<HTMLElement>): boolean {
  if (document.activeElement?.tagName.toLowerCase() !== 'body') return true
  const event = e.event.origin
  event.stopImmediatePropagation()
  const key = event.key.toLowerCase()
  if (key === 'f12') return true

  event.preventDefault()

  if (key === 'control' || key === 'alt' || key === 'shift') return true

  const name = state.selectedTool.name
  let tool: ToolNames | null = null
  switch (key) {
    case 'q': {
      if (name !== 'select') tool = 'select'
      break
    }
    case 'w': {
      if (name !== 'move') tool = 'move'
      break
    }
    case 'e': {
      if (name !== 'rotate') tool = 'rotate'
      break
    }
    case 'r': {
      if (name !== 'transform') tool = 'transform'
      break
    }
  }

  if (tool) {
    state.sendCommand(component, new ChangeToolCommand(tool))
    return true
  }

  return false
}
