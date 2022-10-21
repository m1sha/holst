import { Color, HSV } from '../src/core/colors/color'

test('color from hex', () => {
  const color = new Color('#ffffff')
  expect(color.r).toBe(255)
  expect(color.g).toBe(255)
  expect(color.b).toBe(255)

  const color2 = new Color('#800f00')
  expect(color2.r).toBe(128)
  expect(color2.g).toBe(15)
  expect(color2.b).toBe(0)

  const color3 = new Color('#fff')
  expect(color3.r).toBe(255)
  expect(color3.g).toBe(255)
  expect(color3.b).toBe(255)

  const color4 = new Color('#ffffffff')
  expect(color4.r).toBe(255)
  expect(color4.g).toBe(255)
  expect(color4.b).toBe(255)
  expect(color4.a).toBe(1)

  const color5 = new Color('#ffffff00')
  expect(color5.r).toBe(255)
  expect(color5.g).toBe(255)
  expect(color5.b).toBe(255)
  expect(color5.a).toBe(0)
})

test('color from rgb', () => {
  const color = new Color(128, 0, 88)
  expect(color.r).toBe(128)
  expect(color.g).toBe(0)
  expect(color.b).toBe(88)
})

test('color to string', () => {
  const color = new Color(128, 128, 128)
  expect('#808080').toBe(color.toString())
  const color2 = new Color('#0011aa')
  expect('#0011aa').toBe(color2.toString())
})

test('color grb to hsv', () => {
  const color = new Color(new HSV(60, 50, 50))
  expect(color).toEqual(new Color(128, 128, 64))

  const color2 = new Color(new HSV(160, 55, 90))
  expect(color2).toEqual(new Color(103, 230, 187))
})

test('color hsv to grb', () => {
  const color = new Color(128, 128, 64)
  expect(color.toHSV()).toEqual(new HSV(60, 50, 50))

  const color2 = new Color(103, 230, 187)
  expect(color2.toHSV()).toEqual(new HSV(160, 55, 90))
})

test('color from number to rgb', () => {
  const colors = [
    [103, 230, 187],
    [128, 128, 64],
    [0, 0, 0],
    [255, 255, 255],
    [255, 0, 255],
    [0, 0, 255],
    [255, 0, 0],
    [0, 255, 0]
  ]

  for (const [r, g, b] of colors) {
    const color = new Color(r, g, b)
    const value = color.value
    const color2 = new Color(value)
    expect(color2.r).toEqual(color.r)
    expect(color2.g).toEqual(color.g)
    expect(color2.b).toEqual(color.b)
  }
})
