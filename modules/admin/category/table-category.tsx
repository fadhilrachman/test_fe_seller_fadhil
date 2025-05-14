'use client';
import BaseInputSearch from '@/components/shared/base-input-search';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CreateCategory from './create-category';
import BaseTable from '@/components/shared/base-table';
import { ColumnDef } from '@tanstack/react-table';
import EditCategory from './edit-category';
import DeleteDialog from '@/components/shared/delete-dialog';
import { useDeleteCategory, useGetCategory } from '@/hooks/category.hook';
import moment from 'moment';
import { CategoryType } from '@/types/category.type';
import BasePagination from '@/components/shared/base-pagination';

const TableCategory = () => {
  const [dialog, setDialog] = useState({
    create: false,
    edit: false,
    delete: false
  });
  const [params, setParams] = useState({ search: '', page: 1, per_page: 10 });
  const [selectedData, setSelectedData] = useState<CategoryType>();
  const {
    data,
    isFetching,
    refetch,
    status: statusGet
  } = useGetCategory(params);
  const { mutateAsync, status } = useDeleteCategory();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: selectedData?.id || '' });
    } catch (error) {
      console.log({ error });
    } finally {
      setDialog((p) => ({ ...p, delete: false }));
    }
  };
  const columns: ColumnDef<CategoryType>[] = [
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
      header: 'Action',
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

  useEffect(() => {
    refetch();
  }, [params]);
  return (
    <div className="rounded-lg border bg-gray-50 ">
      <div className="border-b p-4">
        <p>Total Category : {data?.pagination?.total_data}</p>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 p-4 md:flex-row">
        <div className="flex space-x-2">
          <BaseInputSearch
            onChange={(e) => {
              setParams((p) => ({ ...p, search: e }));
            }}
            placeholder="Search category "
          />
        </div>
        <Button
          className="w-full md:w-max"
          onClick={() => {
            setDialog((p) => ({ ...p, create: true }));
          }}
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <div className="space-y-4 pb-4">
        <BaseTable
          status={statusGet}
          columns={columns}
          data={data?.result || []}
          loading={isFetching}
          refetch={refetch}
        />{' '}
        <BasePagination
          currentPage={params.page}
          totalPages={data?.pagination.total_page as number}
          onPageChange={(page) => setParams((p) => ({ ...p, page }))}
          totalItems={data?.pagination.total_data as number}
        />
      </div>

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
        description={`Delete category “${selectedData?.name}”? This will remove it from master data permanently`}
        onDelete={handleDelete}
        isOpen={dialog.delete}
        loading={status == 'pending'}
        onClose={() => {
          setDialog((p) => ({ ...p, delete: false }));
        }}
      />
    </div>
  );
};

export default TableCategory;
