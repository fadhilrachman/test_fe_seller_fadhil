'use client';
import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(process.env.COOKIE_NAME as string);
    router.push('/login');
  };
  return (
    <div className=" flex w-full items-center justify-between border-b bg-white px-5 py-3 sm:px-10 md:px-[60px] md:py-4">
      <a href="/article">
        <img src="/logo-auth.svg" alt="" />
      </a>
      <Popover>
        <PopoverTrigger>
          {' '}
          <div className=" flex items-center space-x-[6px] rounded-xl px-3 py-2 transition-all ">
            <Avatar className="h-[32px] w-[32px] bg-primary">
              <AvatarFallback className=" bg-blue-200 text-primary">
                CN
              </AvatarFallback>
            </Avatar>
            <p className="hidden text-sm font-medium underline md:block">
              James Dean
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="end">
          <div
            className="cursor-pointer px-4 py-2 hover:bg-slate-50"
            onClick={() => {
              router.push('/profile');
            }}
          >
            <p className="text-sm font-normal text-slate-600 ">My Account</p>
          </div>
          <div className="border-t  border-gray-100 ">
            <Button
              variant="ghost"
              className="h-max   w-full justify-start rounded-none px-4 py-2 text-red-600 hover:bg-gray-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
