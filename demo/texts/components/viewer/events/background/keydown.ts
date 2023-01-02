import { KeyboardEventDecorator } from '../../../../../../src/core/events/decorators'
import { InteractiveEvent } from '../../../../../../src/core/events/interactive'
import { AppState } from '../../../../model/app-state'
import { ChangeToolCommand } from '../../../../model/commands/change-tool-command'
import { ToolNames } from '../../../../model/tool'
import { Viewer } from '../../viewer'

export function onBackgroundKeydown (e: InteractiveEvent<KeyboardEventDecorator>, state: AppState, viewer: Viewer) {
  const event = e.event.origin
  event.stopImmediatePropagation()
  const key = event.key.toLowerCase()
  if (key !== 'f12') event.preventDefault()

  if (key === 'control' || key === 'alt' || key === 'shift') return

  const name = state.selectedTool.name

  printKey(event)

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
