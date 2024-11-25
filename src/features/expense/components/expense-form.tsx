import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ExpenseSchema } from './expense-schema'
import { useToast } from '@/hooks/use-toast'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { CategoriesSelect } from '@/components/categories'
import { useDispatch } from 'react-redux'
import { addExpense } from '@/stores/expense-slice'
import { addButgetExpense } from '@/stores/total-budget-slice'
import { DatePicker } from '@/components/date-picker/date-picker'

type Props = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ExpenseForm = ({ setIsDrawerOpen }: Props) => {
  const dispatch = useDispatch()

  const { toast, error } = useToast()

  const form = useForm({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      createDate: '',
      category: '',
    },
  })

  const onSubmit = (data: z.infer<typeof ExpenseSchema>) => {
    try {
      const newExpense = {
        id: uuidv4(),
        ...data,
      }

      dispatch(addExpense(newExpense))
      dispatch(addButgetExpense(data.amount))

      toast({
        title: 'Gider başarıyla kaydedildi!',
      })
      setIsDrawerOpen(false)
      form.reset()
    } catch (err) {
      error('Bir hata oluştu!', 'Veriler kaydedilemedi.')
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gider Adı</FormLabel>
              <FormControl>
                <Input
                  placeholder="Gider adı girin"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <CategoriesSelect />
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Input
                  placeholder="Açıklama girin"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutar</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Limit girin"
                  {...field}
                  className="w-full"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  value={field.value === 0 ? '' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="createDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" className="w-full">
          Kaydet
        </Button>
      </form>
    </FormProvider>
  )
}
