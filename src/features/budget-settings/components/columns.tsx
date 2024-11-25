import { ColumnDef } from '@tanstack/react-table'
import { removeBudget } from '@/stores/budget-slice'
import { Budget } from '@/types/budget'
import { useDispatch } from 'react-redux'
import { useLimitWarning } from '@/hooks/useLimitWarning'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleAlert, CircleCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Columns = (): ColumnDef<Budget>[] => {
  const dispatch = useDispatch()
  const warnings = useLimitWarning()

  const handleDelete = (id: string) => {
    dispatch(removeBudget(id))
  }

  return [
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
      accessorKey: 'budgetLimit',
      header: 'Bütçe Limiti',
      cell: ({ row }) => {
        const limit = row.getValue('budgetLimit') as number
        const formatted = new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'TRY',
        }).format(limit)

        return <div className="text-center font-medium">{formatted}</div>
      },
      enableSorting: true,
    },
    {
      accessorKey: 'warning',
      header: 'Uyarı',
      cell: ({ row }) => {
        const category = row.getValue('category') as string
        const warningMessage = warnings[category]

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {warningMessage ? (
                  <CircleAlert className="cursor-pointer text-red-500" />
                ) : (
                  <CircleCheck className="cursor-pointer" color="#22c55e" />
                )}
              </TooltipTrigger>
              {warningMessage ? (
                <TooltipContent>
                  <div>{warningMessage}</div>
                </TooltipContent>
              ) : (
                <TooltipContent>
                  <div>Limitinizi henüz aşmadınız...</div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )
      },
      enableSorting: false,
    },
    {
      id: 'delete',
      header: ' ',
      cell: ({ row }) => (
        <Button
          onClick={() => handleDelete(row.original.id)}
          variant={'outline'}
        >
          <Trash2 className="text-red-500" />
        </Button>
      ),
      enableSorting: false,
    },
  ]
}
