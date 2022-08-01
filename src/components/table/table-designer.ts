import { Table } from './table'
import { TableControl } from './table-control'
import { Color } from '../../core/color'
import { Scene } from '../../core/scene'
import { ConstraintGrid } from '../../core/constraint-grid'
import { Layer } from '../../core/layers'
import { TextBlock } from '../../core/label'
import { Rect } from '../../core/rect'
import Shape from '../../core/shape'
import { Drawable } from '../../core/drawable'
import { Cell } from './cell'
import { Row } from './row'

type CellDrawCallbackResult = { cellShape: Shape, content: Drawable[] }
type CellDrawCallback = (cell: Cell, columnIndex: number, row: Row, rowIndex: number, rect: Rect) => CellDrawCallbackResult
export { CellDrawCallback, CellDrawCallbackResult }

export class TableDesigner {
  table: Table
  scene: Scene
  onCellDraw: CellDrawCallback | null = null

  constructor (table: Table, scene: Scene) {
    this.table = table
    this.scene = scene
  }

  create () {
    if (!this.table.rows) return
    const columns = this.table.rows[0].cells.length
    const grid = new ConstraintGrid(this.table.containerRect, this.table.rows.length, columns, this.getConstraint())
    const layer = this.scene.createLayer()
    const controls: TableControl[] = []
    for (let rowIndex = 0; rowIndex < this.table.rows.length; rowIndex++) {
      const row = this.table.rows[rowIndex]
      for (let columnIndex = 0; columnIndex < row.cells.length; columnIndex++) {
        const cell = row.cells[columnIndex]
        const constraints = grid.getCell(rowIndex, columnIndex)

        const content: Drawable[] = []
        let cellShape
        if (this.onCellDraw) {
          const result = this.onCellDraw(cell, columnIndex, row, rowIndex, constraints.rect)
          cellShape = result.cellShape
          content.push(...result.content)
          layer.addShape(cellShape)
          for (const item of result.content) {
            if (item.type === 'shape') layer.addShape(item as Shape)
            if (item.type === 'text') layer.addTextBlock(item as TextBlock)
          }
          cell.bounds = constraints.rect
          cell.content = content
        } else {
          cellShape = layer.createShape({ stroke: cell.hidden ? Color.white : '#B1B1B1' }).rect(constraints.rect)
          cell.bounds = constraints.rect
          if (cell.content) content.push(this.createDefaultLabel(cell, constraints.rect, layer))
        }

        controls.push({
          cellShape,
          content,
          cell,
          row,
          columnIndex,
          rowIndex
        })
      }
    }
    return controls
  }

  getConstraint () {
    const rows = []
    for (let i = 0; i < this.table.rows.length; i++) {
      const tRow = this.table.rows[i]
      if (tRow.height === 0) continue
      rows.push({ row: i, height: tRow.height })
    }

    const columns = []
    for (let i = 0; i < this.table.rows[0].cells.length; i++) {
      const tCol = this.table.rows[0].cells[i]
      if (tCol.width === 0) continue
      columns.push({ column: i, width: tCol.width })
    }

    return {
      rows,
      columns
    }
  }

  private createDefaultLabel (cell: Cell, rect: Rect, layer: Layer) {
    const textStyle = cell.textStyle ?? { fontSize: '18px', color: '#000' }
    const textBlock = new TextBlock(cell.content as string, textStyle)
    const r = rect.outline(8)
    textBlock.target = r
    textBlock.size = r
    layer.addTextBlock(textBlock)

    return textBlock
  }
}
