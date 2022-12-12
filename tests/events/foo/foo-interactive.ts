import { uid } from '../../../src/utils/uid'
import { Interactive } from '../../../src/core/events/interactive'

export class FooInteractive implements Interactive {
  id: string = uid()
  name: string = 'A'
  order: number = 1
  data?: any

  constructor (name: string, order: number, data?: any) {
    this.name = name
    this.order = order
    this.data = data
  }

  inPath () { return true }
  off () { return this }
  on () { return this }
}
