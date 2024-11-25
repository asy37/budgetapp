import { useSelector } from 'react-redux'
import categories from './categories.json'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RootState } from '@/stores/store'

type Props = {
  filtered?: boolean
}

export const CategoriesSelect: React.FC<Props> = ({ filtered }) => {
  const existingCategories = useSelector(
    (state: RootState) =>
      state.budget.budgetModel?.map((budget) => budget.category) ?? []
  )

  const allCategories = categories

  const availableCategories = filtered
    ? allCategories.filter(
        (category) => !existingCategories.includes(category.name)
      )
    : allCategories

  return (
    <>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Kategori seçin" className="w-full" />
      </SelectTrigger>
      <SelectContent>
        {availableCategories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}
