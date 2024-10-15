'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CreateEmployee } from '@/features/dashboard/(master-data)/employee/create-employee';

const breadcrumbItems = [
  { title: 'Master Data', link: '/dashboard', current: true },
  { title: 'Karyawan', link: '/dashboard/employees' },
  { title: 'Tambah Karyawan', link: '/dashboard/employees/crate-employee' }
];

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title={`Tambah Karyawan`} description="Tambah Karyawan Baru" />
      </div>
      <Separator />

      <CreateEmployee />
    </div>
  );
}
