'use client'
import { DataGrid } from '@/components/data-grid'
import { DrawerForm } from '@/components/drawer/drawer'
import { IncomeForm } from '@/features/income/components/income-form'
import { RootState } from '@/stores/store'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeIncome, setIncome } from '@/stores/income-slice'
import { columns as columnsData } from './components/columns'
import { useToast } from '@/hooks/use-toast'
import { ContentProvider } from '@/components/providers/content-provider'

export const IncomeWrapper = () => {
  const income = useSelector((state: RootState) => state.income)

  const dispatch = useDispatch()
  const { toast } = useToast()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDelete = (id: string) => {
    dispatch(removeIncome(id))
    toast({ title: 'Gelir başarıyla silindi!' })
  }

  const columns = columnsData(handleDelete)

  return (
    <ContentProvider loading>
      <DataGrid
        breadcrumb="Gelirler"
        columns={columns}
        data={income.incomeModel ?? []}
        handleDrawer={() => setIsDrawerOpen((prev) => !prev)}
      />
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        title="Gelir Ekle"
        description="Buradan gelirlerinizi ekleyebilirsiniz"
      >
        <IncomeForm setIsDrawerOpen={setIsDrawerOpen} />
      </DrawerForm>
    </ContentProvider>
  )
}
