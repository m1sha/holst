import { ConstraintGrid } from '../../src/core/constraint-grid'

test('Constraint Grid 3x3', () => {
  const grid = new ConstraintGrid({ width: 300, height: 300 }, 3, 3)
  expect(grid.getCell(0, 0).rect.absCenter).toEqual({ x: 50, y: 50 })
  expect(grid.getCell(1, 1).rect.absCenter).toEqual({ x: 150, y: 150 })
  expect(grid.getCell(1, 2).center).toEqual({ x: 250, y: 150 })
  expect(grid.getCell(2, 2).center).toEqual({ x: 250, y: 250 })
  expect(grid.getCell(2, 0).center).toEqual({ x: 50, y: 250 })
})

test('Constraint Grid 9x9', () => {
  const grid = new ConstraintGrid({ width: 300, height: 300 }, 9, 9)
  expect(grid.getCell(4, 4).center).toEqual({ x: 150, y: 150 })
})
