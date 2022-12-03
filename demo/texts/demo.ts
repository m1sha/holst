import { PropertyViewer } from '../utils/property-viewer/property-viewer'
import { ObjectList } from '../utils/object-list/object-list'
import { State } from '../utils/state/state'
import { Viewer } from '../utils/viewer/viewer'
import { createDefaultTextBlocks } from './create-default-text-blocks'

export class Demo {
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
