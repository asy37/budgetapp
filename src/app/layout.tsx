import type { Metadata } from 'next'
import '@/assets/css/globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layouts/app-sidebar'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AppHeader } from '@/components/layouts/app-header'
import { ReduxProvider } from '@/components/providers/redux-provider'

export const metadata: Metadata = {
  title: '2nTech Budget App',
  description: '2nTech Budget App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">
                <AppHeader />
                <div className="w-full p-4">{children}</div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
