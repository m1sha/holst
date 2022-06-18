import { Size } from '../../size'
import { Scene } from '../../scene'
import { Row } from './row'

export class Table {
  private scene: Scene
  containerSize: Size
  constructor (scene: Scene, containerSize: Size) {
    this.scene = scene
    this.containerSize = containerSize
  }

  create () {
    //
  }

  addRow (): Row {
    return new Row()
  }
}
