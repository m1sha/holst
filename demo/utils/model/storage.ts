import { Drawable } from '../../../src'
import { ViewObject } from './view-object'

export class ObjectStorage {
  viewObjects: ViewObject[] = []
  addViewObject (viewObject: ViewObject) {
    this.viewObjects.push(viewObject)
  }

  update () {
    this.viewObjects.forEach(p => p.update())
  }

  select (drawable: Drawable) {
    this.unselect()
    for (const object of this.viewObjects) {
      if (object.object.id === drawable.id) {
        object.selected = true
        return
      }
    }
  }

  unselect () {
    this.viewObjects.forEach(p => (p.selected = false))
  }
}
