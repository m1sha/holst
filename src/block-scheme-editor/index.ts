import { CommandController } from './command-controller'
import { ElementFactory } from './elements/element-factory'
import { Environment } from './environment'
import { RuntimeController } from './runtime-controller'

export function createEditor (canvas: HTMLCanvasElement) {
  const block0 = ElementFactory.createActionBlock()
  const block1 = ElementFactory.createActionBlock()
  const environment = new Environment(canvas)

  const commandController = new CommandController(environment)
  const runtimeController = new RuntimeController(environment, commandController)
  runtimeController.start()

  commandController.createBlock(block0, { position: { x: 10, y: 10 }, text: 'ToDo' })
  commandController.createBlock(block1, { position: { x: 70, y: 10 }, text: 'ToDo' })
  commandController.selectBlock(block0)
  commandController.unselectBlock(block0)
  commandController.moveBlock(block0, 10, 70)
//  commandController.undo()
}
