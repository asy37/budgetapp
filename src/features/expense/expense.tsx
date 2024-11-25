'use client'

import { DataGrid } from '@/components/data-grid'
import { DrawerForm } from '@/components/drawer/drawer'
import { RootState } from '@/stores/store'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpenseForm } from './components/expense-form'
import { columns as columnsData } from './components/columns'
import { useToast } from '@/hooks/use-toast'
import { removeExpense, setExpense } from '@/stores/expense-slice'
import { ContentProvider } from '@/components/providers/content-provider'

export const ExpenseWrapper = () => {
  const expense = useSelector((state: RootState) => state.expense)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    dispatch(removeExpense(id))
    toast({ title: 'Gelir başarıyla silindi!' })
  }
  const columns = columnsData(handleDelete)

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  return (
    <ContentProvider loading>
      <DataGrid
        breadcrumb="Gider Harcamaları"
        columns={columns}
        data={expense.expenseModel ?? []}
        handleDrawer={() => setIsDrawerOpen((prev) => !prev)}
      />
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        title="Gider Harcamaları"
        description="Gider harcamalarınızı buradan ekleyebilirsiniz."
      >
        <ExpenseForm setIsDrawerOpen={setIsDrawerOpen} />
      </DrawerForm>
    </ContentProvider>
  )
}
