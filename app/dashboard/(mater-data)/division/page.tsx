'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CreateDivision } from '@/features/dashboard/(master-data)/division/create-division';
import ListDivision from '@/features/dashboard/(master-data)/division/list-division';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Divisi', link: '/dashboard/division' }
];

const Page = () => {
  const [dialog, setDialog] = useState({
    create: false
  });
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Divisi`} description="Manage Divisi" />

        <Button
          onClick={() => {
            setDialog((p) => ({ ...p, create: true }));
          }}
          variant={'default'}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Divisi
        </Button>
      </div>
      <Separator />

      <ListDivision />
      {dialog.create && (
        <CreateDivision
          isOpen={dialog.create}
          onClose={() => {
            setDialog((p) => ({ ...p, create: false }));
          }}
        />
      )}
    </div>
  );
};

export default Page;
