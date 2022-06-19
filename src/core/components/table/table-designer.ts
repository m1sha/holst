import { Scene } from '../../scene'
import { ConstraintGrid } from '../../constraint-grid'
import { Table } from './table'
import { TableControl } from './table-control'

export class TableDesigner {
  table: Table
  scene: Scene

  constructor (table: Table, scene: Scene) {
    this.table = table
    this.scene = scene
  }

  create () {
    if (!this.table.rows) return
    const columns = this.table.rows[0].cells.length
    const grid = new ConstraintGrid(this.table.containerRect, this.table.rows.length, columns, {
      rows: [{ row: 0, height: 80 }, { row: 1, height: 180 }],
      columns: [{ column: 0, width: 100 }, { column: 1, width: 200 }, { column: 2, width: 150 }]
    })
    const layer = this.scene.createLayer()
    const controls: TableControl[] = []
    for (let rowIndex = 0; rowIndex < this.table.rows.length; rowIndex++) {
      const row = this.table.rows[rowIndex]
      for (let columnIndex = 0; columnIndex < row.cells.length; columnIndex++) {
        const cell = row.cells[columnIndex]
        const constraints = grid.getCell(rowIndex, columnIndex)
        const cellShape = layer.createShape({ strokeStyle: '#333' }).rect(constraints.rect)
        // cell
        layer.createTextBlock(cell.content as string, { fontSize: '18px', color: '#000' }, constraints.center)

        controls.push({
          cellShape,
          cell,
          row,
          columnIndex,
          rowIndex
        })
      }
    }
    return { controls, layer, grid }
  }
}
