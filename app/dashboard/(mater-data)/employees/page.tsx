'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import ListEmployee from '@/features/dashboard/(master-data)/employee/list-employee';
import { CreateEmployee } from '@/features/dashboard/(master-data)/employee/create-employee';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Karyawan', link: '/dashboard/employees' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Karyawan`} description="Manage Karyawan" />

        <Button
          onClick={() => {
            router.push('/dashboard/employees/create-employee');
          }}
          variant={'default'}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Karyawan
        </Button>
      </div>
      <Separator />
      <ListEmployee />
    </div>
  );
}
