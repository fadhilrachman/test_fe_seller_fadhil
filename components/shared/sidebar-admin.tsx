'use client';
import React from 'react';
import { Building2, LogOut, Tag } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const listSidebar = [
  {
    href: '/admin/article',
    label: 'Articles',
    icon: <Building2 size={20} />
  },
  {
    href: '/admin/category',
    label: 'Category',
    icon: <Tag size={20} />
  }
];

const SidebarAdmin = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    Cookies.remove(process.env.COOKIE_NAME as string);
    router.push('/login');
  };
  return (
    <div className="hidden min-h-[100vh] min-w-[267px] space-y-6 bg-primary py-8 text-white transition-all md:block">
      <div className="flex items-center justify-center">
        <img src="/logo-sidebar.svg" alt="" />
      </div>
      <div className="space-y-4 px-6">
        {listSidebar.map((val, key) => {
          return (
            <div
              key={key}
              onClick={() => {
                router.push(val.href);
              }}
              className={`flex cursor-pointer items-center space-x-2 rounded-lg transition-all hover:bg-blue-500 ${
                pathName == val.href && 'bg-blue-500'
              } px-3 py-2`}
            >
              {val.icon}
              <p>{val.label}</p>
            </div>
          );
        })}
        <div
          onClick={handleLogout}
          className={`flex cursor-pointer items-center space-x-2 rounded-lg px-3 py-2  transition-all hover:bg-blue-500`}
        >
          <LogOut size={20} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
