import { Breadcrumbs } from '@/components/breadcrumbs';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Divisi', link: '/dashboard/division' }
];

const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Divisi`} description="Manage Divisi" />

        <Link
          href={'/dashboard/employee/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Divisi
        </Link>
      </div>
    </div>
  );
};

export default page;
