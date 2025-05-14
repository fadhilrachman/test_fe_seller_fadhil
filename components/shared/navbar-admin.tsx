'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Building2, LogOut, Menu, Tag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const NavbarAdmin = () => {
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = () => {
    Cookies.remove(process.env.COOKIE_NAME as string);
    router.push('/login');
  };
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
  return (
    <div className=" z-50 flex w-full items-center justify-between border-b bg-white px-5 py-5 sm:px-10 md:px-[60px] ">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button variant={'outline'} className="block md:hidden">
              <Menu />{' '}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'top'}
            className="h-1/2 w-full !border-none bg-primary text-white"
          >
            <SheetHeader className="flex h-full !w-full  items-center justify-center space-y-6">
              <div className="flex items-center justify-center">
                <img src="/logo-sidebar.svg" alt="" />
              </div>
              <div className="w-full space-y-4 ">
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
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <img src="/logo-auth.svg" alt="" />
      </div>
      <div
        onClick={() => {
          router.push('/admin/profile');
        }}
        className=" flex cursor-pointer items-center space-x-[6px] rounded-xl px-3 py-2 hover:bg-slate-100"
      >
        <Avatar className="h-[32px] w-[32px] bg-primary">
          <AvatarFallback className=" bg-blue-200">CN</AvatarFallback>
        </Avatar>
        <p className="hidden text-sm font-medium underline md:block">
          James Dean
        </p>
      </div>
    </div>
  );
};

export default NavbarAdmin;
