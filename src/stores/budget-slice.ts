import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDataToStorage } from '@/helpers/storageHelper'
import { Budget, BudgetResponse } from '@/types/budget'

type InitialStateType = {
  amount: number
  budgetModel: Budget[]
}

const initialState: InitialStateType = {
  amount: 0,
  budgetModel: [],
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<any>) => {
      state.budgetModel.push(action.payload)
      state.amount += action.payload.budgetLimit

      if (state.budgetModel && state.amount !== undefined) {
        setDataToStorage('budgetData', {
          budgetModel: state.budgetModel,
          totalAmount: state.amount,
        })
      }
    },

    removeBudget: (state, action: PayloadAction<string>) => {
      const budgetToRemove = state.budgetModel.find(
        (budget) => budget.id === action.payload
      )

      if (budgetToRemove) {
        state.amount -= budgetToRemove.budgetLimit
      }

      state.budgetModel = state.budgetModel.filter(
        (budget) => budget.id !== action.payload
      )

      setDataToStorage('budgetData', {
        budgetModel: state.budgetModel,
        totalAmount: state.amount,
      })
    },

    setBudget: (state, action: PayloadAction<BudgetResponse>) => {
      state.budgetModel = action.payload.budgetModel
      state.amount = action.payload.totalAmount
    },
  },
})

export const { setBudget, addBudget, removeBudget } = budgetSlice.actions
export default budgetSlice.reducer
