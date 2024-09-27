'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ListShifting from '@/features/dashboard/(attendance-management)/shifting/list-shifting';
import { Plus } from 'lucide-react';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Shifting', link: '/dashboard/shifting' }
];
const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Shifting`} description="Manage Divisi" />

        <Button
          onClick={() => {
            // setDialog((p) => ({ ...p, create: true }));
          }}
          variant={'default'}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Shifting
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default page;
