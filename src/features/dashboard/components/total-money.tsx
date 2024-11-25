'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'
import { Button } from '@/components/ui/button'

export const TotalMoney = () => {
  const [showBudget, setShowBudget] = useState(false)
  const [showIncome, setShowIncome] = useState(false)
  const [showExpense, setShowExpense] = useState(false)

  const totalBudget = useSelector(
    (state: RootState) => state.totalBudget.totalAmount
  )
  const totalIncome = useSelector((state: RootState) => state.income.amount)
  const totalExpense = useSelector((state: RootState) => state.expense.amount)

  const formattedTotalBudget = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(totalBudget)
  const formattedTotalIncome = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(totalIncome)
  const formattedTotalExpense = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(totalExpense)
  return (
    <div className="flex w-full shrink-0 flex-col items-center justify-between gap-2 lg:flex-row">
      <Card className="flex h-full w-full items-center justify-around p-2">
        <CardHeader className="text-xl font-bold">Anlık Bütçeniz:</CardHeader>
        {!showBudget ? (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            {formattedTotalBudget}₺
          </CardContent>
        ) : (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            *****
          </CardContent>
        )}
        {!showBudget ? (
          <Button
            variant={'outline'}
            onClick={() => setShowBudget(!showBudget)}
          >
            <Eye className="cursor-pointer text-gray-500" />
          </Button>
        ) : (
          <Button
            variant={'outline'}
            onClick={() => setShowBudget(!showBudget)}
          >
            <EyeOff className="cursor-pointer text-gray-500" />
          </Button>
        )}
      </Card>

      <Card className="flex h-full w-full items-center justify-around p-2">
        <CardHeader className="text-xl font-bold">Toplam Geliriniz:</CardHeader>
        {!showIncome ? (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            {formattedTotalIncome}₺
          </CardContent>
        ) : (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            *****
          </CardContent>
        )}
        {!showIncome ? (
          <Button
            variant={'outline'}
            onClick={() => setShowIncome(!showIncome)}
          >
            <Eye className="!cursor-pointer text-gray-500" />
          </Button>
        ) : (
          <Button
            variant={'outline'}
            onClick={() => setShowIncome(!showIncome)}
          >
            <EyeOff className="!cursor-pointer text-gray-500" />
          </Button>
        )}
      </Card>

      <Card className="flex h-full w-full items-center justify-around p-2">
        <CardHeader className="text-xl font-bold">
          Toplam Giderleriniz:
        </CardHeader>
        {!showExpense ? (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            {formattedTotalExpense}₺
          </CardContent>
        ) : (
          <CardContent className="p-6 text-lg font-semibold text-gray-500">
            *****
          </CardContent>
        )}
        {!showExpense ? (
          <Button
            variant={'outline'}
            onClick={() => setShowExpense(!showExpense)}
          >
            <Eye className="cursor-pointer text-gray-500" />
          </Button>
        ) : (
          <Button
            variant={'outline'}
            onClick={() => setShowExpense(!showExpense)}
          >
            <EyeOff className="cursor-pointer text-gray-500" />
          </Button>
        )}
      </Card>
    </div>
  )
}
