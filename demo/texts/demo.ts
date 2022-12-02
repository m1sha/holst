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
  private appDiv: HTMLDivElement

  constructor (div: HTMLDivElement) {
    this.state = new State()
    this.propertyViewer = new PropertyViewer(this.state)
    this.objectList = new ObjectList(this.state)
    this.viewer = new Viewer(this.state)
    this.appDiv = div
  }

  build () {
    this.objectList.setItems(this.state.selectedLayer!.entities as any[])
    this.objectList.filter = item => item.type === 'text'
    this.objectList.title = item => item.text ? item.text.replaceAll('\n', ' ') : ''
    this.state.addViewObjects(createDefaultTextBlocks())

    this.createView()
  }

  private createView () {
    this.appDiv.className = 'app'
    this.appDiv.append(this.objectList.rootElement)
    this.appDiv.append(this.viewer.rootElement)
    this.appDiv.append(this.propertyViewer.rootElement)

    this.propertyViewer.build()
    this.viewer.build()
    this.objectList.build()
  }
}
