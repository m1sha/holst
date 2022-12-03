import { PropertyViewer } from './property-viewer/property-viewer'
import { ObjectList } from './object-list/object-list'
import { State } from '../model/state'
import { createDefaultTextBlocks } from '../create-default-text-blocks'
import { Viewer } from './viewer/viewer'

export class App {
  private state: State
  private propertyViewer: PropertyViewer
  private objectList: ObjectList
  private viewer: Viewer

  constructor () {
    this.state = new State()
    this.propertyViewer = new PropertyViewer(this.state)
    this.objectList = new ObjectList(this.state)
    this.viewer = new Viewer(this.state)
  }

  create (appDiv: HTMLDivElement) {
    this.state.addViewObjects(createDefaultTextBlocks())

    this.objectList.filter = item => item.object.type === 'text'
    this.objectList.title = item => item.object.text ? item.object.text.replaceAll('\n', ' ') : ''

    this.objectList.build()
    this.propertyViewer.build()
    this.viewer.build()

    appDiv.className = 'app'
    appDiv.append(this.objectList.rootElement)
    appDiv.append(this.viewer.rootElement)
    appDiv.append(this.propertyViewer.rootElement)
  }
}
