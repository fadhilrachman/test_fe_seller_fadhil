'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UpdateEmployee } from '@/features/dashboard/(master-data)/employee/update-employee';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { employeeId } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Karyawan', link: '/dashboard/employees' },
    { title: 'Detail Karyawan', link: `/dashboard/employees/${employeeId}` }
  ];
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <UpdateEmployee />
    </div>
  );
}
