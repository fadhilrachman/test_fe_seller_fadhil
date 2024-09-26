'use client';
import Header from '@/components/layout/header';
import PageContainer from '@/components/layout/page-container';
import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/hooks/useSidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isMinimized, toggle } = useSidebar();

  return (
    <div className="relative flex bg-white">
      <Sidebar />
      <main
        className={`${
          !isMinimized ? 'sm:ml-72' : 'sm:ml-[72px]'
        } min-h-[100vh] w-full   bg-[#F6F7F9] transition-all`}
      >
        <Header />
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
