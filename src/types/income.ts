export interface Income {
  id: string
  name: string
  description: string
  category: string
  createDate: string
  amount: number
}

export interface IncomePayload extends Omit<Income, 'id'> {}
export interface IncomeResponse {
  incomeModel: Income[]
  totalAmount: number
}
