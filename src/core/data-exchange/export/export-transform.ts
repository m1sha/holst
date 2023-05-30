import { Matrix2D } from '../../matrix'

export function exportTransform (matrix: Matrix2D): string {
  if (matrix.equals(Matrix2D.identity)) return ''
  return `${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f}`
}
