import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = () => {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between border-b bg-white px-5 py-5 sm:px-10 md:px-[60px] md:py-8">
      <img src="/logo-auth.svg" alt="" />
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="hidden font-medium underline md:block">James Dean</p>
      </div>
    </div>
  );
};

export default Navbar;
