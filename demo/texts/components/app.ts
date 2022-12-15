import { PropertyViewer } from './property-viewer/property-viewer'
import { ObjectList } from './object-list/object-list'
import { Toolbar } from './toolbar/toolbar'
import { createDefaultTextBlocks } from '../create-default-text-blocks'
import { Viewer } from './viewer/viewer'
import { Grid } from './grid/grid'
import { AppState } from '../model/app-state'

export class App {
  private state: AppState
  private grid: Grid
  private propertyViewer: PropertyViewer
  private objectList: ObjectList
  private toolbar: Toolbar
  private viewer: Viewer

  constructor () {
    this.state = new AppState()
    this.grid = new Grid()
    this.propertyViewer = new PropertyViewer(this.state)
    this.objectList = new ObjectList(this.state)
    this.toolbar = new Toolbar(this.state)
    this.viewer = new Viewer(this.state)
  }

  create (appDiv: HTMLDivElement) {
    this.state.addEntities(createDefaultTextBlocks())

    this.toolbar.build()

    this.objectList.filter = item => item.target.type === 'text'
    this.objectList.title = item => item.target.text ? item.target.text.replaceAll('\n', ' ') : ''
    this.objectList.build()

    this.propertyViewer.build()
    this.viewer.build()

    appDiv.className = 'app'
    appDiv.append(this.grid.rootElement)

    const appMap = {
      'top-side': this.toolbar,
      'body-side': {
        'left-side': this.objectList,
        'middle-side': this.viewer,
        'right-side': this.propertyViewer
      }
    }

    this.grid.add(appMap)
    this.grid.build()
  }
}
