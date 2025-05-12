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
import CreateCategory from './create-category';
import BaseTable from '@/components/shared/base-table';
import { ColumnDef } from '@tanstack/react-table';
import EditCategory from './edit-category';
import DeleteDialog from '@/components/shared/delete-dialog';
import { useGetCategory } from '@/hooks/category.hook';
import moment from 'moment';
import { CategoryType } from '@/types/category.type';

const data = [
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' },
  { name: 'Catecory1', created_at: 'April 13, 2025 10:55:12' }
];
const TableCategory = () => {
  const [dialog, setDialog] = useState({
    create: false,
    edit: false,
    delete: false
  });
  const [params, setParams] = useState({ search: '', page: 1, per_page: 10 });
  const [selectedData, setSelectedData] = useState<CategoryType>();
  const { data, isFetching } = useGetCategory(params);

  const columnsDivision: ColumnDef<CategoryType>[] = [
    {
      accessorKey: 'name',
      header: 'Category'
    },
    {
      accessorKey: 'created_at',
      header: 'Crated At',
      cell: ({ row }) => {
        return <>{moment(row?.original?.created_at).toISOString()}</>;
      }
    },
    {
      accessorKey: '',
      header: 'AKSI',
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => {
              setSelectedData(row?.original);
              setDialog((p) => ({ ...p, edit: true }));
            }}
            variant={'link'}
            className="underline"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedData(row?.original);
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
        <p>Total Category : {data?.pagination?.total_data}</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex space-x-2">
          <BaseInputSearch onChange={() => {}} placeholder="Search category " />
        </div>
        <Button
          onClick={() => {
            setDialog((p) => ({ ...p, create: true }));
          }}
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <BaseTable
        columns={columnsDivision}
        data={data?.result || []}
        loading={isFetching}
      />

      {/* ////////////// */}
      {/* DIALOG */}
      {/* ////////////// */}
      <CreateCategory
        isOpen={dialog.create}
        onClose={() => {
          setDialog((p) => ({ ...p, create: false }));
        }}
      />
      <EditCategory
        data={selectedData}
        isOpen={dialog.edit}
        onClose={() => {
          setDialog((p) => ({ ...p, edit: false }));
        }}
      />
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

export default TableCategory;
