'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { UpdateEmployee } from '@/features/dashboard/(master-data)/employee/update-employee';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { employeeId } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Karyawan', link: '/dashboard/employees' },
    {
      title: 'Edit',
      link: `/dashboard/employees/${employeeId}/update-employee`
    }
  ];
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title={`Edit`} description="Edit Data Karyawan" />
      </div>
      <Separator />
      <UpdateEmployee />
    </div>
  );
}
