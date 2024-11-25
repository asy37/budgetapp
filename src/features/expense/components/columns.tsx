import { Button } from '@/components/ui/button'
import { Expense } from '@/types/expense'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

export const columns = (
  handleDelete: (id: string) => void
): ColumnDef<Expense>[] => [
  {
    accessorKey: 'name',
    header: 'İsim',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: 'Kategori',
    cell: ({ row }) => <div>{row.getValue('category')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: 'Açıklama',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'date',
    header: 'Oluşturulma Tarihi',
    cell: ({ row }) => {
      const formattedDate = row.original.createDate
      return <div>{formattedDate}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Gider Miktarı',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      const formatted = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      }).format(amount)

      return <div className="text-center font-medium">{formatted}</div>
    },
    enableSorting: true,
  },
  {
    id: 'delete',
    header: ' ',
    cell: ({ row }) => {
      return (
        <Button
          variant={'outline'}
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="text-red-500" />
        </Button>
      )
    },
    enableSorting: false,
  },
]
