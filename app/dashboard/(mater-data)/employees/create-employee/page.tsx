'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { CreateEmployee } from '@/features/dashboard/(master-data)/employee/create-employee';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Karyawan', link: '/dashboard/employees' },
  { title: 'Tambah Karyawan', link: '/dashboard/employees/crate-employee' }
];

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Heading title={`Tambah Karyawan`} description="" />
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <CreateEmployee />
    </div>
  );
}
