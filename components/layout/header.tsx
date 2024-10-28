import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';

export default function Header() {
  return (
    <header className="border bg-white py-2 pr-12">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        {/* <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div> */}
        <div className="flex items-center gap-2">
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </header>
  );
}
