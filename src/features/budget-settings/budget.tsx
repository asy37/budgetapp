'use client'

import { DataGrid } from '@/components/data-grid'
import { DrawerForm } from '@/components/drawer/drawer'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import { BudgetForm } from './components/budget-form'
import React from 'react'
import { Columns } from './components/columns'
import { ContentProvider } from '@/components/providers/content-provider'

export const BudgetWrapper = () => {
  const budget = useSelector((state: RootState) => state.budget)

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  if (!budget || !budget.budgetModel) {
    return <p>Veri yükleniyor...</p> // Loader veya hata mesajı ekle
  }
  return (
    <ContentProvider loading>
      <DataGrid
        breadcrumb="Bütçeler"
        columns={Columns()}
        data={budget.budgetModel ?? undefined}
        handleDrawer={() => setIsDrawerOpen((prev) => !prev)}
      />
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        title="Bütçe Ekle"
        description="Buradan bütçelerinizi ekleyebilirsiniz"
      >
        <BudgetForm setIsDrawerOpen={setIsDrawerOpen} />
      </DrawerForm>
    </ContentProvider>
  )
}
