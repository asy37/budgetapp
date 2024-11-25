import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BudgetSchema } from './budget-schema'
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
import { Select } from '@/components/ui/select'
import { CategoriesSelect } from '@/components/categories'
import { useDispatch } from 'react-redux'
import { addBudget } from '@/stores/budget-slice'

type Props = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const BudgetForm = ({ setIsDrawerOpen }: Props) => {
  const dispatch = useDispatch()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      description: '',
      budgetLimit: 0,
      category: '',
    },
  })

  const onSubmit = (data: z.infer<typeof BudgetSchema>) => {
    try {
      const newBudget = {
        id: uuidv4(),
        ...data,
      }

      dispatch(addBudget(newBudget))

      toast({
        title: 'Bütçe başarıyla kaydedildi!',
        description: `${data.category} kategoriye eklendi.`,
      })
      setIsDrawerOpen(false)
      form.reset()
    } catch (error) {
      console.error('Hata:', error)
      toast({ title: 'Hata', description: 'Veriler kaydedilemedi.' })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-4"
      >
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
                  <CategoriesSelect filtered />
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
          name="budgetLimit"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bütçe Limiti</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Limit girin"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  value={field.value === 0 ? '' : field.value}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="w-full">
          Kaydet
        </Button>
      </form>
    </Form>
  )
}
