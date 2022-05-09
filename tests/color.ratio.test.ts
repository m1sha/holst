import { Color } from '../src/core/color'

test('color ratio contrast good', () => {
  const color1 = new Color('#9e9e9e')
  const color2 = new Color('#0d0d0d')
  const d = color1.getContrastRatio(color2)
  expect(d).toBeGreaterThan(7.25)
  expect(d).toBeLessThan(7.26)
})

test('color ratio contrast bad', () => {
  const color1 = new Color('#ff55bb')
  const color2 = new Color('#0d0d0d')
  const d = color1.getContrastRatio(color2)
  expect(d).toBeGreaterThan(6.72)
  expect(d).toBeLessThan(6.73)
})
