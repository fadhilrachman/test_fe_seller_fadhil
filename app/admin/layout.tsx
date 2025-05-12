import NavbarAdmin from '@/components/shared/navbar-admin';
import SidebarAdmin from '@/components/shared/sidebar-admin';
import React from 'react';

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className=" relative w-full">
        <NavbarAdmin />
        <div className="min-h-[90vh] bg-gray-100 p-6">{children}</div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
