import { IImageData } from '../../src/core/raster/filters/helpers/image-data'
import { PixelMatrix } from '../../src/core/raster/filters/helpers/pixel-matrix'
import { PixelSet } from './helpers/pixel-set'
import { toHexString } from './helpers/to-hex-string'

const raster = new PixelSet(`
  FF030A 8D7A5C 998011 | 151044 A4A3C2 C2E2EC | 881267 18AEF0
  1F7FDD 1D1A1C E388C1 | 121734 160055 DFA3C6 | 7799EE 433411
  2F5F6D 2A3F61 16794E | 00A1FD BB1EF8 991490 | C79F72 818283
  -----------------------------------------------------------
  B8B7AF C10923 748641 | E5E0C4 B4A5BB CCA9BE | 82C2A8 B2E8A7
  6F182F 1D9E51 B98414 | B512DD ACB3F2 D2D1EF | 8F1869 DE1EF7
  5F7CD5 BD1A2C E481CB | A2F738 17BA56 DCA3CD | C769EB 13F417
  -----------------------------------------------------------
  1F8F6B 2FBF74 F679BE | 1CA6AD AB5EF7 E91795 | C1BF7F D384C3
  D1A8A1 C219B3 F48B49 | A4ECF4 B5A9EE 47CD1E | 12C3A2 F7E4B2
`)

const createImageData = (): IImageData => ({
  data: raster.toU8Array(),
  width: 8,
  height: 8,
  colorSpace: 'srgb'
})

const imageData = createImageData()
const pixelMatrix = new PixelMatrix(imageData, '3x3')

test('pixel matrix 3x3 length must be 8', () => {
  const length = pixelMatrix.length
  expect(length).toBe(9)
})

test('pixel matrix 3x3 index 0', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(0)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('FF030A 8D7A5C 998011 1F7FDD 1D1A1C E388C1 2F5F6D 2A3F61 16794E')
})

test('pixel matrix 3x3 index 1', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(1)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('151044 A4A3C2 C2E2EC 121734 160055 DFA3C6 00A1FD BB1EF8 991490')
})

test('pixel matrix 3x3 index 2', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(2)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('881267 18AEF0 000000 7799EE 433411 000000 C79F72 818283 000000')
})

test('pixel matrix 3x3 index 3', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(3)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('B8B7AF C10923 748641 6F182F 1D9E51 B98414 5F7CD5 BD1A2C E481CB')
})

test('pixel matrix 3x3 index 4', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(4)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('E5E0C4 B4A5BB CCA9BE B512DD ACB3F2 D2D1EF A2F738 17BA56 DCA3CD')
})

test('pixel matrix 3x3 index 5', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(5)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('82C2A8 B2E8A7 000000 8F1869 DE1EF7 000000 C769EB 13F417 000000')
})

test('pixel matrix 3x3 index 6', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(6)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('1F8F6B 2FBF74 F679BE D1A8A1 C219B3 F48B49 000000 000000 000000')
})

test('pixel matrix 3x3 index 7', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(7)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('1CA6AD AB5EF7 E91795 A4ECF4 B5A9EE 47CD1E 000000 000000 000000')
})

test('pixel matrix 3x3 index 8', () => {
  const [r, g, b] = pixelMatrix.getMatrix3x3(8)
  const hexes = toHexString(r.toArray(), g.toArray(), b.toArray())
  expect(hexes).toBe('C1BF7F D384C3 000000 12C3A2 F7E4B2 000000 000000 000000 000000')
})
