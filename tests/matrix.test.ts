import { matrix, Matrix2D } from '../src/core/matrix'

test('matrix: identity * identity = identity', () => {
  const m1 = Matrix2D.identity
  const m2 = Matrix2D.identity
  m1.mul(m2)
  expect(m1).toEqual(Matrix2D.identity)
})

test('matrix: Move X * Move Y = Move XY', () => {
  const m1 = matrix(1, 0, 0, 1, -5, 10)
  const m2 = matrix(1, 0, 0, 1, 10, 20)
  m1.mul(m2)
  expect(m1).toEqual(matrix(1, 0, 0, 1, 5, 30))
})
