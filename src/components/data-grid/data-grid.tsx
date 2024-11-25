'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { TableHead } from './data-table-head'

interface Identifiable {
  id: string
}
interface Props<TData extends Identifiable> {
  breadcrumb: string
  columns: ColumnDef<TData>[]
  data: TData[]
  handleDrawer: () => void
}

export const DataGrid = <TData extends Identifiable>({
  breadcrumb,
  columns,
  data,
  handleDrawer,
}: Props<TData>) => {
  return (
    <>
      <TableHead breadcrumb={breadcrumb} handleDrawer={handleDrawer} />
      <DataTable columns={columns} data={data} />
    </>
  )
}
