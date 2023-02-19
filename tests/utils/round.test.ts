import { round } from '../../src/utils/round'

test('round', () => {
  expect(round(0)).toBe(0)
  expect(round(0.4)).toBe(0)
  expect(round(0.5)).toBe(1)
  expect(round(2.3)).toBe(2)
  expect(round(2.8)).toBe(3)
  expect(round(-0.4)).toBe(0)
  expect(round(-0.5)).toBe(-1)
  expect(round(-0.9)).toBe(-1)
  expect(round(-2.3)).toBe(-2)
  expect(round(-2.8)).toBe(-3)
})
