import { Scene } from '../src/core/scene'
import { Renderer2D } from '../src/core/renderer2D'
import { createMockContext } from './mock/mock-canvas-rendering-context2d'
import './mock/mock-path2d'
import './mock/mockDOMMatrix'

test('MockCanvasRenderingContext2D', () => {
  const mock = createMockContext()
  const scene = new Scene()
  const layer = scene.createLayer()
  layer.createShape({ stroke: '#333 ' }).rect({ x: 0, y: 0, width: 100, height: 100 })
  const renderer = new Renderer2D(mock.ctx)
  renderer.render(scene)

  expect(mock.logger).toBeDefined()
})
