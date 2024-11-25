import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  ArrowDownToDot,
  ArrowUpFromDot,
  CalculatorIcon,
  CircleDollarSign,
  LayoutDashboard,
} from 'lucide-react'
import Link from 'next/link'

export function AppSidebar() {
  const items = [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Gelir Listesi',
      url: '/income',
      icon: ArrowUpFromDot,
    },
    {
      title: 'Gider Listesi',
      url: '/expense',
      icon: ArrowDownToDot,
    },
    {
      title: 'Bütçe Düzenleme',
      url: '/budget-settings',
      icon: CircleDollarSign,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="flex h-16 items-center gap-2 border-b p-4">
          <CalculatorIcon />
          <h1 className="text-xl font-semibold">Budget App</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
