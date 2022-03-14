import { StyleManager } from '../src/core/style-manager'

test('Style Manager', () => {
  const manager = new StyleManager()
  manager.defineShapeStyle('style 1', { strokeStyle: '#222' })
  const style = manager.shapes('style 1')
  expect(style.strokeStyle).toBe('#222')
})
