import { ViewObject } from './view-object'

export class ObjectStorage {
  viewObjects: ViewObject[] = []
  addViewObject (viewObject: ViewObject) {
    this.viewObjects.push(viewObject)
  }

  update () {
    this.viewObjects.forEach(p => p.update())
  }

  select (viewObject: ViewObject) {
    this.unselect()
    for (const object of this.viewObjects) {
      if (object.object.id === viewObject.object.id) {
        object.selected = true
        return
      }
    }
  }

  unselect () {
    this.viewObjects.forEach(p => (p.selected = false))
  }
}
