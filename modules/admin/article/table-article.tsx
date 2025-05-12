'use client';
import BaseInputSearch from '@/components/shared/base-input-search';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import BaseTable from '@/components/shared/base-table';
import { ColumnDef } from '@tanstack/react-table';
import DeleteDialog from '@/components/shared/delete-dialog';
import { useRouter } from 'next/navigation';

const data = [
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  },
  {
    category: 'Catecory1',
    title: 'Cybersecurity Essentials Every Developer Should Know',
    created_at: 'April 13, 2025 10:55:12'
  }
];
const TableArticle = () => {
  const router = useRouter();
  const [dialog, setDialog] = useState({
    delete: false
  });
  const columnsDivision: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return <p className="mx-auto max-w-[200px]">{row?.original?.title}</p>;
      }
    },
    {
      accessorKey: 'category',
      header: 'Category'
    },
    {
      accessorKey: 'created_at',
      header: 'Crated At'
    },
    {
      accessorKey: '',
      header: 'AKSI',
      cell: ({ row }) => (
        <div>
          <Button onClick={() => {}} variant={'link'} className="underline">
            Edit
          </Button>
          <Button
            onClick={() => {
              setDialog((p) => ({ ...p, delete: true }));
            }}
            variant={'link'}
            className="text-red-500 underline"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];
  return (
    <div className="rounded-lg border bg-gray-50 ">
      <div className="border-b p-4">
        <p>Total Articles : 25</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className=" w-max  bg-white text-black">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <BaseInputSearch onChange={() => {}} placeholder="Search category " />
        </div>
        <Button
          onClick={() => {
            router.push('/admin/article/add');
          }}
        >
          <Plus />
          Add Article
        </Button>
      </div>
      <BaseTable columns={columnsDivision} data={data || []} loading={false} />

      {/* ////////////// */}
      {/* DIALOG */}
      {/* ////////////// */}

      <DeleteDialog
        title="Category"
        description="Delete category “Technology”? This will remove it from master data permanently"
        onDelete={() => {}}
        isOpen={dialog.delete}
        onClose={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
      />
    </div>
  );
};

export default TableArticle;
