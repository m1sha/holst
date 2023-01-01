import { Color, IPoint, TextBlock, TextStyle } from '../../../../src'
import { MutableAppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'

export class CreateTextCommand extends Command<void> {
  execute (appState: MutableAppState): void {
    const textBlock = this.createText(appState.currentText(), appState.currentTextPosition())
    const entity = new Entity(textBlock)
    appState.addEntities([entity])
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    console.log('CreateTextCommand')
    super.rollback(appState)
  }

  private createText (str: string, pos: IPoint) {
    const textStyle: TextStyle = { fontSize: '20px', color: Color.darkGrey }
    const textBlock = TextBlock.create(str, textStyle, pos)

    return textBlock
  }
}
