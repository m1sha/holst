import Orderable from './orderable'
import { sort } from './sorter'

export class Arrange {
  readonly orderableList: Orderable[]
  constructor (orderableList: Orderable[]) {
    this.orderableList = orderableList
  }

  sendToBack (orderable: Orderable) {
    const sorted = this.sorted
    const length = sorted.length
    sorted.indexOf(orderable)
    for (let i = 0; i < length; i++) {
      //
    }
  }

  sendToBackward (orderable: Orderable) {
    console.log(orderable)
  }

  bringToFront (orderable: Orderable) {
    console.log(orderable)
  }

  bringToForward (orderable: Orderable) {
    console.log(orderable)
  }

  get order () {
    return Math.max.apply(null, this.orderableList.map(p => p.order)) + 1
  }

  private get sorted () {
    return sort(this.orderableList)
  }
}
