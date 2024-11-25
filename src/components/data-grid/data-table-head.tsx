'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '../ui/breadcrumb'
import { Button } from '../ui/button'

type Props = {
  breadcrumb: string
  handleDrawer: () => void
}

export const TableHead = ({ breadcrumb, handleDrawer }: Props) => {
  return (
    <div className="flex w-full items-center justify-between p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>{breadcrumb}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        <Button variant={'outline'} onClick={handleDrawer}>
          Ekle
        </Button>
      </div>
    </div>
  )
}
