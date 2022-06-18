import { Scene } from '../../scene'
import { ConstraintGrid } from '../../constraint-grid'
import { Table } from './table'

export class TableDesigner {
  table: Table
  scene: Scene

  constructor (table: Table, scene: Scene) {
    this.table = table
    this.scene = scene
  }

  create () {
    const grid = new ConstraintGrid(this.table.containerRect, this.table.rows.length, 3, {
      rows: [{ row: 0, height: 80 }, { row: 1, height: 180 }],
      columns: [{ column: 0, width: 100 }, { column: 1, width: 200 }, { column: 2, width: 150 }]
    })
    const layer = this.scene.createLayer()
    for (let rowIndex = 0; rowIndex < this.table.rows.length; rowIndex++) {
      const row = this.table.rows[rowIndex]
      for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        const cell = row.cells[cellIndex]
        const constraints = grid.getCell(rowIndex, cellIndex)
        layer.createShape({ strokeStyle: '#333' }).rect(constraints.rect)
        // cell
        layer.createTextBlock(cell.content as string, { fontSize: '18px', color: '#000' }, constraints.center)
      }
    }
    return { layer, grid }
  }
}
