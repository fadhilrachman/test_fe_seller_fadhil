'use client';
import BaseTable from '@/components/base-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { FileIcon } from 'lucide-react';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Shifting', link: '/dashboard/shifting' },
  { title: 'Import', link: '/dashboard/shifting/import' }
];
const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Import Shifting`} description="Manage Divisi" />
      </div>
      <div className="mx-32 mt-4 space-y-4">
        <div className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6">
          <>
            {' '}
            <Input type="file" className="hidden" />
            <FileIcon className="h-12 w-12" />
            <span className="text-sm font-medium text-gray-500">
              Drag and drop a file or click to browse
            </span>
            <span className="text-xs text-gray-500">
              PDF, image, video, or audio
            </span>
          </>
        </div>
        <div className="flex flex-col items-end justify-end">
          <Button>Import</Button>
          <p className="text-xs text-neutral-400">
            *Import untuk menyimpan data
          </p>
        </div>
      </div>
      <BaseTable
        columns={[
          {
            accessorKey: 'name',
            header: 'Nama'
          },
          {
            accessorKey: 'age',
            header: 'Umur'
          },
          {
            accessorKey: 'job_title',
            header: 'Jabatan'
          },
          {
            accessorKey: 'job_title',
            header: 'Jabatan'
          }
        ]}
        data={[
          {
            name: 'Fadhil',
            age: 12,
            job_title: 'Frontend'
          }
        ]}
      />
    </div>
  );
};

export default page;
