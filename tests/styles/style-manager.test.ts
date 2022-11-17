import { StyleManager } from '../../src/core/styles/style-manager'

test('Style Manager', () => {
  const manager = new StyleManager()
  manager.defineShapeStyle('style 1', { stroke: '#222' })
  const style = manager.shapes('style 1')
  expect(style.stroke).toBe('#222')
})
