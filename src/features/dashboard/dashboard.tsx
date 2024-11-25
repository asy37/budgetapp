import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExpenseChart } from './components/expense-chart'
import { TotalMoney } from './components/total-money'
import { Card } from '@/components/ui/card'
import { IncomeChart } from './components/income-chart'
import { ContentProvider } from '@/components/providers/content-provider'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

export const Dashboard = () => {
  return (
    <ContentProvider loading className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between p-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <TotalMoney />
      <Tabs defaultValue="gelir">
        <TabsList className="flex w-full items-center justify-center">
          <TabsTrigger className="w-full" value="gelir">
            Gelir
          </TabsTrigger>
          <TabsTrigger className="w-full" value="gider">
            Gider
          </TabsTrigger>
        </TabsList>
        <Card className="px-8 py-4">
          <TabsContent value="gelir">
            <IncomeChart />
          </TabsContent>
          <TabsContent value="gider">
            <ExpenseChart />
          </TabsContent>
        </Card>
      </Tabs>
    </ContentProvider>
  )
}
