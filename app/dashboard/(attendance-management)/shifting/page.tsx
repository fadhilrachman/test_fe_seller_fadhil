'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FormShifting } from '@/features/dashboard/(attendance-management)/shifting/form-shifting';
import ListShifting from '@/features/dashboard/(attendance-management)/shifting/list-shifting';
import { Import, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Shifting', link: '/dashboard/shifting' }
];
const page = () => {
  const router = useRouter();
  const [dialog, setDialog] = useState({ create: false });
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Shifting`} description="Manage Divisi" />

        <div className="flex space-x-4">
          <Button
            onClick={() => {
              router.push('/dashboard/shifting/import');
            }}
            variant={'outline'}
          >
            <Import className="mr-2 h-4 w-4" /> Import Shifting
          </Button>{' '}
          <Button
            onClick={() => {
              setDialog((p) => ({ ...p, create: true }));
            }}
            variant={'default'}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Shifting
          </Button>
        </div>
      </div>
      <Separator />
      <ListShifting />
      {dialog.create && (
        <FormShifting
          typeForm="create"
          isOpen={dialog.create}
          onClose={() => {
            setDialog((p) => ({ ...p, create: false }));
          }}
        />
      )}
    </div>
  );
};

export default page;
