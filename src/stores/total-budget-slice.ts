import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDataToStorage } from '@/helpers/storageHelper'
import { TotalAmountPayload } from '@/types/total-amount'

type TotalBudgetState = {
  totalAmount: number
}

const initialState: TotalBudgetState = {
  totalAmount: 0,
}

export const totalBudgetSlice = createSlice({
  name: 'totalBudget',
  initialState,
  reducers: {
    addTBudgetIncome: (state, action: PayloadAction<number>) => {
      state.totalAmount += action.payload
      setDataToStorage('totalBudgetData', { totalAmount: state.totalAmount })
    },

    addButgetExpense: (state, action: PayloadAction<number>) => {
      state.totalAmount -= action.payload
      setDataToStorage('totalBudgetData', { totalAmount: state.totalAmount })
    },

    resetTotalBudget: (state) => {
      state.totalAmount = 0
      setDataToStorage('totalBudgetData', { totalAmount: state.totalAmount })
    },

    setTotalBudget: (state, action: PayloadAction<TotalAmountPayload>) => {
      if (action.payload && action.payload.totalAmount !== undefined) {
        state.totalAmount = action.payload.totalAmount
      } else {
        state.totalAmount = 0
      }
    },
  },
})

export const {
  addTBudgetIncome,
  addButgetExpense,
  resetTotalBudget,
  setTotalBudget,
} = totalBudgetSlice.actions
export default totalBudgetSlice.reducer
