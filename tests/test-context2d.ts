import Context2DBase from '../src/core/context2d-base'
import { EventType } from '../src/core/event-type'
import { AnyImageType } from '../src/core/image'
import { Text } from '../src/core/label'
import { TextStyle } from '../src/core/label-style'
import shape from '../src/core/shape'
import { TestCommandDispatcher } from './test-draw-command'
import TestPath2D from './test-path2d'

export default class TestContext2D implements Context2DBase {
  private dispatcher: TestCommandDispatcher

  constructor (dispatcher?: TestCommandDispatcher) {
    this.dispatcher = dispatcher
  }

  drawImage (image: AnyImageType, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void {
    throw new Error('Method not implemented.')
  }

  createPath (): Path2D {
    return new TestPath2D(this.dispatcher)
  }

  get width (): number {
    return 100
  }

  get height (): number {
    return 100
  }

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
