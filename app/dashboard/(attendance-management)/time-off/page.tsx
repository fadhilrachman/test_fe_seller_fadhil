'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FormTimeOff } from '@/features/dashboard/(attendance-management)/time-off/form-time-off';
import ListTimeOff from '@/features/dashboard/(attendance-management)/time-off/list-time-off';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Cuti', link: '/dashboard/time-off' }
];
const page = () => {
  const [dialog, setDialog] = useState({ create: false });

  return (
    <div className="space-y-4">
      {' '}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Cuti`} description="Pantau riwayat Cuti Karyawan" />

        <Button
          onClick={() => {
            setDialog((p) => ({ ...p, create: true }));
          }}
          variant={'default'}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Cuti
        </Button>
      </div>
      <Separator />
      <ListTimeOff />
      {dialog.create && (
        <FormTimeOff
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
