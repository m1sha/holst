import { Scene, Renderer2D } from '../../src/index'
import { PropertyViewer } from '../utils/property-viewer/property-viewer'
import { MovementController } from '../utils/movement/movement-controller'
import { createDefaultTextBlocks } from './create-default-text-blocks'
import { ObjectList } from '../utils/object-list/object-list'
import { State } from '../utils/state/state'

export class Demo {
  private state: State
  private propertyViewer: PropertyViewer
  private movement: MovementController
  private objectList: ObjectList
  private scene: Scene
  private appDiv: HTMLDivElement

  constructor (div: HTMLDivElement) {
    this.state = new State()
    this.propertyViewer = new PropertyViewer(this.state)
    this.movement = new MovementController(this.state)
    this.objectList = new ObjectList(this.state)
    this.scene = new Scene()
    this.state.selectedLayer = this.scene.createLayer()
    this.appDiv = div
  }

  build () {
    createDefaultTextBlocks(this.state.selectedLayer!).forEach(p => this.movement.add(p))

    this.objectList.setItems(this.state.selectedLayer!.entities as any[])
    this.objectList.filter = item => item.type === 'text'
    this.objectList.onGetTitle = item => item.text ? item.text.replaceAll('\n', ' ') : ''
    this.createView()
  }

  private createView () {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext('2d')!
    const renderer = new Renderer2D(ctx)
    renderer.render(this.scene)

    this.appDiv.className = 'app'
    this.appDiv.style.display = 'flex'

    this.appDiv.append(this.objectList.rootElement)
    this.appDiv.append(canvas)
    this.appDiv.append(this.propertyViewer.rootElement)
    this.propertyViewer.build()
    this.objectList.build()
  }
}
