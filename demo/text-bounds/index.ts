import { Shape2 } from '../../src/core/shape2'
import { Scene, Renderer2D, TextBlock, Point, TextStyle, IPoint, Layer, Color } from '../../src/index'
import { PropertyViewer } from '../utils/property-viewer/property-viewer'
import { createTextBlockPropertyRules } from './text-block-property-rules'
import { MovementController } from '../utils/movement/movement-controller'

export function createDemo (div: HTMLDivElement) {
  const propertyViewer = new PropertyViewer()
  const movement = new MovementController()
  const scene = new Scene()
  const layer = scene.createLayer()

  const textBlock0 = createText('Some Text\n', new Point(10, 100), layer)
  const textBlock1 = createText('Some Text\nSome Text', new Point(120, 100), layer)
  const textBlock2 = createText('Some Text', new Point(250, 100), layer)

  const textBlock3 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 100), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
  })

  const textBlock4 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 300), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
    textBlock.overflow = 'word-break'
  })

  const textBlock = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(250, 300), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
    textBlock.overflow = 'word-break + clip'
  })

  movement.add(textBlock0)
  movement.add(textBlock1)
  movement.add(textBlock2)
  movement.add(textBlock3)
  movement.add(textBlock4)
  movement.add(textBlock)
  movement.onUpdate = () => {
    propertyViewer.rebuild()
  }

  propertyViewer.setRules(createTextBlockPropertyRules(textBlock))

  createView(scene, div, propertyViewer, movement)
}

function createText (str: string, pos: IPoint, layer: Layer, callback?: (textBlock: TextBlock) => void) {
  const textStyle: TextStyle = { fontSize: '18px', color: Color.darkGrey }
  const textBlock = TextBlock.create(str, textStyle, pos)
  if (callback) callback(textBlock)
  layer.add(textBlock)
  const bounds = textBlock.bounds
  layer.add(Shape2.create({ stroke: Color.orange }).rect(bounds))
  return textBlock
}

function createView (scene: Scene, div: HTMLDivElement, propertyViewer: PropertyViewer, movement: MovementController) {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')!
  const renderer = new Renderer2D(ctx)
  renderer.render(scene)
  div.append(canvas)

  const propertyViewerContainer = document.createElement('div')
  div.append(propertyViewerContainer)
  propertyViewerContainer.style.marginLeft = '12px'
  propertyViewer.build(propertyViewerContainer)

  movement.onDrawableChanged = () => {
    propertyViewer.setRules(createTextBlockPropertyRules(movement.selected as TextBlock))
    propertyViewer.build(propertyViewerContainer)
  }

  div.style.display = 'flex'
}
