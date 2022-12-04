import { PropertyViewer } from './property-viewer/property-viewer'
import { ObjectList } from './object-list/object-list'
import { Toolbar } from './toolbar/toolbar'
import { State } from '../model/state'
import { createDefaultTextBlocks } from '../create-default-text-blocks'
import { Viewer } from './viewer/viewer'

export class App {
  private state: State
  private propertyViewer: PropertyViewer
  private objectList: ObjectList
  private toolbar: Toolbar
  private viewer: Viewer

  constructor () {
    this.state = new State()
    this.propertyViewer = new PropertyViewer(this.state)
    this.objectList = new ObjectList(this.state)
    this.toolbar = new Toolbar(this.state)
    this.viewer = new Viewer(this.state)
  }

  create (appDiv: HTMLDivElement) {
    this.state.addViewObjects(createDefaultTextBlocks())

    this.toolbar.build()

    this.objectList.filter = item => item.object.type === 'text'
    this.objectList.title = item => item.object.text ? item.object.text.replaceAll('\n', ' ') : ''
    this.objectList.build()

    this.propertyViewer.build()
    this.viewer.build()

    appDiv.className = 'app'
    appDiv.append(this.toolbar.rootElement)

    const content = document.createElement('div')
    content.className = 'content'
    appDiv.append(content)

    content.append(this.objectList.rootElement)
    content.append(this.viewer.rootElement)
    content.append(this.propertyViewer.rootElement)
  }
}
