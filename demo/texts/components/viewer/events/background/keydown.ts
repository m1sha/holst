import { KeyboardEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { ChangeToolCommand } from '../../../../model/commands/change-tool-command'
import { MoveTool, RotateTool, SelectTool, Tool, TransformTool } from '../../../../model/tool'
import { Viewer } from '../../viewer'

export function onBackgroundKeydown (e: InteractiveEvent<KeyboardEventDecorator>, state: AppState, viewer: Viewer) {
  const event = e.event.origin
  event.stopImmediatePropagation()
  event.preventDefault()
  const key = event.key.toLowerCase()

  if (key === 'control' || key === 'alt' || key === 'shift') return

  const name = state.selectedTool.name

  printKey(event)

  let tool: Tool | null = null
  switch (key) {
    case 'q': {
      if (name !== 'select') tool = new SelectTool()
      break
    }
    case 'w': {
      if (name !== 'move') tool = new MoveTool()
      break
    }
    case 'e': {
      if (name !== 'rotate') tool = new RotateTool()
      break
    }
    case 'r': {
      if (name !== 'transform') tool = new TransformTool()
      break
    }
  }

  if (tool) state.sendCommand(viewer, new ChangeToolCommand(tool))
}

function printKey (event: KeyboardEvent) {
  const key = event.key.toUpperCase()
  let c = ''
  if (event.altKey) c += 'Alt + '
  if (event.ctrlKey) c += 'Ctrl + '
  if (event.shiftKey) c += 'Shift + '

  console.log(c + key)
}
