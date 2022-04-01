import Orderable from './orderable'

export class Arrange {
  private counter: number = 0
  readonly orderableList: Orderable[]
  constructor (orderableList: Orderable[]) {
    this.orderableList = orderableList
  }

  sendToBack (orderable: Orderable) {}
  sendToBackward (orderable: Orderable) {}
  bringToFront (orderable: Orderable) {}
  bringToForward (orderable: Orderable) {}

  get order () {
    return ++this.counter
  }
}
