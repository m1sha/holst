import { Table } from '../../core/components/table/table'

export function createTable (table: Table) {
  let t = 9
  while (true) {
    const row1 = table.addRow()
    const timeCell = row1.createCell()
    timeCell.content = (t++).toString() + ':00'
    row1.createCell().content = ''
    row1.createCell().content = ''
    row1.createCell().content = ''
    row1.createCell().content = ''
    row1.createCell().content = ''

    if (t > 23) break
  }
}
