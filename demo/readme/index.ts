import { Scene, Renderer2D, Color, Shape, TextBlock, Layer, Anchor, Animation } from '../../src/index'

export function createDemo (appDiv: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  canvas.height = 600
  canvas.width = 800
  appDiv.append(canvas)
  const scene = new Scene()
  const layer = scene.createLayer()

  const animation = scene.createAnimation({ duration: 1500, infinity: true })
  const animation2 = scene.createAnimation({ duration: 1500, infinity: true })

  const shape = layer.createShape({ fill: Color.blue, stroke: Color.darkGrey, lineWidth: 6, fillStrokeOrder: 'fill-first' })
    .segmentedCircle(150, 150, 80, 6, 1)

  animation.action = ({ t }) => (
    shape.style.fill = Color.fromGradient(t, [Color.blue, Color.red])
  )
  animation2.action = ({ t }) => (
    shape.style.fill = Color.fromGradient(t, [Color.red, Color.blue])
  )

  createControls(scene, [animation, animation2])

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}

function createControls (scene: Scene, animations: Animation[]) {
  const layer = scene.createLayer()
  createButton('Play', 10, 250, layer)
    .on('click', async () => {
      for (const anim of animations) await anim.play()
    })

  createButton('Stop', 120, 250, layer)
    .on('click', () => {
      for (const anim of animations) anim.stop()
    })
  // createButton('Pause', 230, 250, layer)
  //   .on('click', () => {
  //     for (const anim of animations) anim.pause()
  //   })
  // createButton('Resume', 340, 250, layer)
  //   .on('click', () => {
  //     for (const anim of animations) anim.resume()
  //   })
}

function createButton (text: string, x: number, y: number, layer: Layer) {
  const rect = { x, y, width: 100, height: 24 }
  const shape = Shape.create({ stroke: '#333', fill: '#fff', fillStrokeOrder: 'fill-first' }).roundRect(rect, 4)
  const textBlock = TextBlock.create(text + '\n', { fontSize: '12px', outlineColor: '#880000', fillStrokeOrder: 'fill-first' })
  layer.add(shape)
  layer.add(textBlock)
  const anchor = Anchor.create(shape)
  textBlock.setAnchor(anchor)
  textBlock.target = { x: 0, y: 0 }
  textBlock.size = { width: 100, height: 24 }
  textBlock.alignment = 'center'
  textBlock.verticalAlignment = 'center'
  textBlock.baseline = 'middle'
  shape
    .on('hover', e => {
      e.cursor = 'pointer'
      shape.style.stroke = '#111'
      shape.style.fill = '#eee'
    })
    .on('leave', e => {
      e.cursor = 'default'
      shape.style.stroke = '#333'
      shape.style.fill = '#fff'
    })
  return shape
}
