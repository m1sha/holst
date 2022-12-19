import { Color, IPoint, TextBlock, TextStyle } from '../../../../src'
import { AppState } from '../app-state'
import { Entity } from '../entities/entity'
import { Command } from './command'

export class CreateTextCommand extends Command<void> {
  invoke (state: AppState) {
    const textBlock = this.createText(state.currentText, state.currentTextPosition)
    const entity = new Entity(textBlock)
    state.addEntities([entity])
  }

  private createText (str: string, pos: IPoint) {
    const textStyle: TextStyle = { fontSize: '20px', color: Color.darkGrey }
    const textBlock = TextBlock.create(str, textStyle, pos)

    return textBlock
  }
}
