import { matrix, MATRIX } from '../src/core/matrix'

test('matrix: identity * identity = identity', () => {
  const m1 = MATRIX.identity
  const m2 = MATRIX.identity
  const m = MATRIX.mul(m1, m2)
  expect(m).toEqual(MATRIX.identity)
})

test('matrix: Move X * Move Y = Move XY', () => {
  const m1 = matrix(1, 0, 0, 1, -5, 10)
  const m2 = matrix(1, 0, 0, 1, 10, 20)
  const m = MATRIX.mul(m1, m2)
  expect(m).toEqual(matrix(1, 0, 0, 1, 5, 30))
})
