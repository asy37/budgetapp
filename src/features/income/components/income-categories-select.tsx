import categories from '../../../components/categories/income-categories.json'

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

export const IncomeCategoriesSelect: React.FC<Props> = ({ filtered }) => {
  return (
    <>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Kategori seçin" className="w-full" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}
