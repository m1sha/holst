import { Point } from '../../../src/core/point'

export class Block {
  type: string
  position: Point
  text: string
  next: Block | null
  previous: Block | null
  selected: boolean
  hovered: boolean
  _uid: number

  constructor (_uid: number, type: string) {
    this.type = type
    this._uid = _uid
    this.position = new Point(0, 0)
    this.text = ''
    this.selected = false
    this.hovered = false
    this.next = null
    this.previous = null
  }
}

export interface CreateBlockOption {
  position: Point
  text: string
}
