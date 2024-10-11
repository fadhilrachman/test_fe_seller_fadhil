'use client';
import BaseTable from '@/components/base-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { FileIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Shifting', link: '/dashboard/shifting' },
  { title: 'Import', link: '/dashboard/shifting/import' }
];
const page = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // mutate(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ], // .xlsx
      'application/vnd.ms-excel': ['.xls'] // .xls
    },
    onDropAccepted(files, event) {
      console.log({ files });
    },
    onDropRejected: (fileRejections) => {
      console.log('File ditolak karena bukan Excel:', fileRejections);
    }
  });
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Import Shifting`} description="Manage Divisi" />
      </div>
      <div className=" mt-4 space-y-4">
        <div
          {...getRootProps()}
          className="flex  cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6"
        >
          <>
            {' '}
            <Input type="file" className="hidden" {...getInputProps()} />
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
