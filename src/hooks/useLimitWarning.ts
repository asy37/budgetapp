import { useEffect, useState, useMemo } from 'react'

type BudgetLimit = Record<string, number>
type Expenses = Record<string, number>

type Expense = {
  category: string
  amount: number
  [key: string]: any
}

type Budget = {
  category: string
  amount: number
  [key: string]: any
}

export const useCategoryWiseTotal = (): Expenses => {
  const [categoryTotals, setCategoryTotals] = useState<Expenses>({})

  useEffect(() => {
    const data = localStorage.getItem('expenseData')

    if (!data) return

    try {
      const parsedData = JSON.parse(data)
      const expenseData: Expense[] = parsedData.expenseModel || []

      const totals = expenseData.reduce((acc, { category, amount }) => {
        if (category && amount) {
          acc[category] = (acc[category] || 0) + amount
        }
        return acc
      }, {} as Expenses)

      setCategoryTotals(totals)
    } catch (error) {
      console.error('Expense verisi okunurken hata oluştu:', error)
    }
  }, [])

  return categoryTotals
}

export const useBudgetWiseTotal = (): BudgetLimit => {
  const [categoryTotals, setCategoryTotals] = useState<BudgetLimit>({})

  useEffect(() => {
    const data = localStorage.getItem('budgetData')

    if (!data) return

    try {
      const parsedData = JSON.parse(data)
      const budgetData: Budget[] = parsedData.budgetModel || []

      const totals = budgetData.reduce((acc, { category, budgetLimit }) => {
        if (category && budgetLimit) {
          acc[category] = (acc[category] || 0) + budgetLimit
        }
        return acc
      }, {} as BudgetLimit)

      setCategoryTotals(totals)
    } catch (error) {
      console.error('Budget verisi okunurken hata oluştu:', error)
    }
  }, [])

  return categoryTotals
}

export const useLimitWarning = (): Record<string, string> => {
  const expenses = useCategoryWiseTotal()
  const limits = useBudgetWiseTotal()

  return useMemo(() => {
    const warnings: Record<string, string> = {}

    Object.keys(expenses).forEach((category) => {
      const expense = expenses[category]
      const budgetLimit = limits[category]

      if (expense && budgetLimit) {
        const percentageUsed = (expense / budgetLimit) * 100
        if (percentageUsed > 80) {
          warnings[category] =
            `${category} kategorisinde giderler bütçenin %80'ini aştı!`
        }
      }
    })

    return warnings
  }, [expenses, limits])
}
