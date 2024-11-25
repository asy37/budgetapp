export interface Expense {
  id: string
  name: string
  category: string
  description: string
  createDate: string
  amount: number
}

export interface ExpensePayload extends Omit<Expense, 'id'> {}
export interface ExpenseResponse {
  expenseModel: Expense[]
  totalAmount: number
}
