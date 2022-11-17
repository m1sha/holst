import { Matrix3x3 } from '../../src/utils/matrix3x3'

test('matrix 3x3: identity matrix * identity = identity', () => {
  const c = Matrix3x3.identity.mul(Matrix3x3.identity)
  const cString = c.toString()
  const identityString = Matrix3x3.identity.toString()
  expect(cString).toBe(identityString)
})

test('matrix 3x3: identity matrix * zero matrix = zero matrix', () => {
  const c = Matrix3x3.identity.mul(new Matrix3x3())
  const cString = c.toString()
  const identityString = new Matrix3x3().toString()
  expect(cString).toBe(identityString)
})

test('matrix 3x3: custom matrix * identity matrix = identity matrix', () => {
  const a = new Matrix3x3(10, 20, 30, 0, -9, 8, 1, -1, 22)
  const c = a.mul(Matrix3x3.identity)
  const cString = c.toString()
  const aString = a.toString()
  expect(cString).toBe(aString)
})

test('matrix 3x3: custom matrix * scalar = custom matrix * scalar', () => {
  const a = new Matrix3x3(10, 20, 30, 0, -9, 8, 1, -1, 22)
  const c = a.mul(2)
  const cString = c.toString()
  const resultString = new Matrix3x3(20, 40, 60, 0, -18, 16, 2, -2, 44).toString()
  expect(cString).toBe(resultString)
})

test('matrix 3x3: custom matrix * scalar = custom matrix * scalar (mulSelf)', () => {
  const a = new Matrix3x3(10, 20, 30, 0, -9, 8, 1, -1, 22)
  a.mulSelf(2)
  const aString = a.toString()
  const resultString = new Matrix3x3(20, 40, 60, 0, -18, 16, 2, -2, 44).toString()
  expect(aString).toBe(resultString)
})

test('matrix 3x3: custom matrix * identity matrix = identity matrix (mulSelf)', () => {
  const a = new Matrix3x3(10, 20, 30, 0, -9, 8, 1, -1, 22)
  a.mulSelf(Matrix3x3.identity)
  const aString = a.toString()
  const identityString = new Matrix3x3(10, 20, 30, 0, -9, 8, 1, -1, 22).toString()
  expect(aString).toBe(identityString)
})
