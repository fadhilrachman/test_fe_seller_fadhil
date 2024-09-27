'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FormAnnouncement } from '@/features/dashboard/announcement/form-announcement';
import ListAnnouncement from '@/features/dashboard/announcement/list-announcement';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Pengumuman', link: '/dashboard/announcement' }
];
const page = () => {
  const [dialog, setDialog] = useState({ create: false });

  return (
    <div className="space-y-4">
      {/* <div className="w-[100px] border bg-gray-500">cuyy</div> */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading
          title={`Pengumuman`}
          description="Sampaikan Pengumuman yang Harus Diketahui Semua Karyawan"
        />

        <Button
          onClick={() => {
            setDialog((p) => ({ ...p, create: true }));
          }}
          variant={'default'}
        >
          <Plus className="mr-2 h-4 w-4" /> Buat Pengumuman
        </Button>
      </div>
      <Separator />
      <ListAnnouncement />

      <FormAnnouncement
        typeForm="create"
        isOpen={dialog.create}
        onClose={() => {
          setDialog((p) => ({ ...p, create: false }));
        }}
      />
    </div>
  );
};

export default page;
