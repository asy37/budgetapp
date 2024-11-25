import { z } from 'zod'

export const ExpenseSchema = z.object({
  name: z.string(),
  description: z.string().min(1, 'Açıklama gerekli'),
  amount: z.number().positive('Tutar pozitif olmalı'),
  createDate: z.string().min(1, 'Tarih gerekli'),
  category: z.string(),
})
