import Context2DBase from '../src/core/context2d-base'
import { EventType } from '../src/core/event-type'
import { Text } from '../src/core/label'
import { TextStyle } from '../src/core/label-style'
import shape from '../src/core/shape'

export default class TestContext2D implements Context2DBase {
  get width (): number { return 100 }
  get height (): number { return 100 }

  drawShape (shape: shape, mask?: shape): void {
    throw new Error('Method not implemented.')
  }

  drawText (text: Text, mask?: shape): void {
    throw new Error('Method not implemented.')
  }

  measureText (value: string, style: TextStyle) {
    throw new Error('Method not implemented.')
  }

  on (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[]) {
    throw new Error('Method not implemented.')
  }
}
