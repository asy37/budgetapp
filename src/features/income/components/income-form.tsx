import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IncomeSchema } from './income-schema'
import { useToast } from '@/hooks/use-toast'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { addIncome } from '@/stores/income-slice'
import { addTBudgetIncome } from '@/stores/total-budget-slice'
import { DatePicker } from '@/components/date-picker/date-picker'
import { Select } from '@/components/ui/select'
import { IncomeCategoriesSelect } from './income-categories-select'

type Props = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const IncomeForm = ({ setIsDrawerOpen }: Props) => {
  const dispatch = useDispatch()

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(IncomeSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      amount: 0,
      createDate: '',
    },
  })

  const onSubmit = (data: z.infer<typeof IncomeSchema>) => {
    try {
      const newIncome = {
        id: uuidv4(),
        ...data,
      }

      dispatch(addIncome(newIncome))
      dispatch(addTBudgetIncome(data.amount))

      toast({ title: 'Gelir başarıyla kaydedildi!' })
      setIsDrawerOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: 'Bir hata oluştu!',
        description: 'Veriler kaydedilemedi.',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gelir Adı</FormLabel>
              <FormControl>
                <Input
                  placeholder="Gelir adı girin"
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
                  <IncomeCategoriesSelect />
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
                  placeholder="Tutar girin"
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
          render={({ field }) => <DatePicker />}
        />

        <Button type="submit" variant="default" className="w-full">
          Kaydet
        </Button>
      </form>
    </Form>
  )
}
