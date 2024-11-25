import { z } from 'zod'

export const BudgetSchema = z.object({
  category: z.string().min(1, 'Kategori gerekli'),
  description: z.string().min(1, 'Açıklama gerekli'),
  budgetLimit: z.number().min(1, 'Bütçe limiti gerekli'),
})
