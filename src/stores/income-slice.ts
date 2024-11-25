import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDataToStorage } from '@/helpers/storageHelper'
import { Income, IncomeResponse } from '@/types/income'

type InitialStateType = {
  amount: number
  incomeModel: Income[]
}

const initialState: InitialStateType = {
  amount: 0,
  incomeModel: [],
}

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<any>) => {
      state.incomeModel.push(action.payload)
      state.amount += action.payload.amount

      setDataToStorage('incomeData', {
        incomeModel: state.incomeModel,
        totalAmount: state.amount,
      })
    },

    removeIncome: (state, action: PayloadAction<string>) => {
      const incomeToRemove = state.incomeModel.find(
        (income) => income.id === action.payload
      )

      if (incomeToRemove) {
        state.amount -= incomeToRemove.amount
      }

      state.incomeModel = state.incomeModel.filter(
        (income) => income.id !== action.payload
      )

      setDataToStorage('incomeData', {
        incomeModel: state.incomeModel,
        totalAmount: state.amount,
      })
    },

    setIncome: (state, action: PayloadAction<IncomeResponse>) => {
      state.incomeModel = action.payload.incomeModel
      state.amount = action.payload.totalAmount
    },
  },
})

export const { setIncome, addIncome, removeIncome } = incomeSlice.actions
export default incomeSlice.reducer
