export interface Budget {
  id: string
  name: string
  category: string
  description: string
  createDate: string
  budgetLimit: number
}

export interface BudgetPayload extends Omit<Budget, 'id'> {}
export interface BudgetResponse {
  budgetModel: Budget[]
  totalAmount: number
}
