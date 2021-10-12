import { Point } from '../../core/point'
import { point } from '../../core/utils'

export class Block {
  type: string
  position: Point
  text: string
  next: Block
  previous: Block
  selected: boolean
  hovered: boolean
  _uid: number

  constructor (_uid: number, type: string) {
    this.type = type
    this._uid = _uid
    this.position = point(0, 0)
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
