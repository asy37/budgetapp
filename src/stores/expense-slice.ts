import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDataToStorage } from '@/helpers/storageHelper'
import { Expense, ExpenseResponse } from '@/types/expense'

type InitialStateType = {
  amount: number
  expenseModel: Expense[]
}

const initialState: InitialStateType = {
  amount: 0,
  expenseModel: [],
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<any>) => {
      state.expenseModel.push(action.payload)
      state.amount += action.payload.amount

      setDataToStorage('expenseData', {
        expenseModel: state.expenseModel,
        totalAmount: state.amount,
      })
    },

    removeExpense: (state, action: PayloadAction<string>) => {
      const expenseToRemove = state.expenseModel.find(
        (expense) => expense.id === action.payload
      )

      if (expenseToRemove) {
        state.amount -= expenseToRemove.amount
      }

      state.expenseModel = state.expenseModel.filter(
        (expense) => expense.id !== action.payload
      )

      setDataToStorage('expenseData', {
        expenseModel: state.expenseModel,
        totalAmount: state.amount,
      })
    },

    setExpense: (state, action: PayloadAction<ExpenseResponse>) => {
      state.expenseModel = action.payload.expenseModel
      state.amount = action.payload.totalAmount
    },
  },
})

export const { setExpense, addExpense, removeExpense } = expenseSlice.actions
export default expenseSlice.reducer
