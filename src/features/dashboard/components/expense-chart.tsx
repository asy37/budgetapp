'use client'
import CategoriesPie from '@/components/charts/categories-chart'
import TimeGraphic from '@/components/charts/time-chart'
import { Label } from '@/components/ui/label'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'

export const ExpenseChart = () => {
  const expenseData = useSelector(
    (state: RootState) => state.expense.expenseModel
  )

  return (
    <div className="flex w-full flex-col items-center justify-between lg:flex-row">
      <div className="flex w-full flex-col items-center justify-between">
        <Label className="mb-4 w-full text-center text-xl font-semibold">
          Yıllık Zaman Grafiği
        </Label>
        <TimeGraphic list={expenseData} />
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-5">
        <Label className="mb-4 w-full text-center text-xl font-semibold">
          Kategori Dağılımı
        </Label>
        <CategoriesPie list={expenseData} />
      </div>
    </div>
  )
}
