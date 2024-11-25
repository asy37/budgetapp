import { configureStore } from '@reduxjs/toolkit'
import { incomeSlice } from './income-slice'
import { expenseSlice } from './expense-slice'
import { budgetSlice } from './budget-slice'
import { totalBudgetSlice } from './total-budget-slice'

export const store = configureStore({
  reducer: {
    income: incomeSlice.reducer,
    expense: expenseSlice.reducer,
    budget: budgetSlice.reducer,
    totalBudget: totalBudgetSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
