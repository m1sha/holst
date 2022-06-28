import { Scene } from '../src/core/scene'
import { Renderer2D } from '../src/core/renderer2D'
// import { Matrix2D } from '../src/core/matrix'
import './mock/mockDOMMatrix'
import { createMockContext } from './mock/mock-canvas-rendering-context2d'

test('MockCanvasRenderingContext2D', () => {
  const mock = createMockContext()
  const scene = new Scene()
  const layer = scene.createLayer()
  // layer.createShape({ strokeStyle: '#333 ' }).rect({ x: 0, y: 0, width: 100, height: 100 })
  const r = new Renderer2D(mock.ctx)
  r.render(scene)

  expect(layer).toBeDefined()
})
