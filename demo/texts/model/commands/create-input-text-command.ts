import { IPoint } from '../../../../src'
import { Command } from './command'

export class CreateInputTextCommand extends Command<IPoint[]> {
  constructor (point: IPoint, offsetPoint: IPoint) {
    super()
    this.data = [point, offsetPoint]
  }
}
