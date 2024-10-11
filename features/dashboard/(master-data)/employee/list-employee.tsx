'use client';
import { useListEmployee } from '@/hooks/useEmployee';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import BaseTable from '@/components/base-table';
import { ColumnDef } from '@tanstack/react-table';
import { EmployeDtoType } from '@/types/employe';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BasePagination from '@/components/base-pagination';
import BaseInputSearch from '@/components/base-input-search';
import { BaseFilter } from '@/components/base-filter';
import { Skeleton } from '@/components/ui/skeleton';

const ListEmployee = () => {
  const router = useRouter();
  const { data, isFetching, refetch } = useListEmployee({});
  const [isDialog, setIsDialog] = useState({
    delete: false,
    filter: false
  });
  const [filter, setFilter] = useState({
    division_id: { id: '', label: '' }
  });
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: '',
    division_id: filter.division_id.id
  });

  const columnsEmployee: ColumnDef<EmployeDtoType>[] = [
    {
      accessorKey: 'nik',
      header: 'ID KARYAWAN',
      // size: 10
      maxSize: 3,
      enableResizing: true,
      enableColumnFilter: true,
      enableSorting: true
    },
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: ({ row, column, getValue }) => (
        <div className="flex items-center space-x-1">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.original.avatar || 'https://github.com/shadcn.png'}
              alt="@shadcn"
            />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.original.name}</span>
        </div>
      )
    },
    {
      accessorKey: 'email',
      header: 'EMAIL'
    },
    {
      accessorKey: 'job_title',
      header: 'POSITION'
    },
    {
      accessorKey: 'division',
      header: 'DIVISI',
      cell: ({ row }) => <>{row.original?.division?.name || 'IT'}</>
    },
    {
      accessorKey: 'division',
      header: 'AKSI',
      cell: ({ row }) => (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/employees/${row.original.id}`);
              }}
            >
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/employees/${row.original.id}/update-employee`
                )
              }
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    // {
    //   id: 'actions',
    //   cell: ({ row }) => <CellAction data={row.original} />
    // }
  ];

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);

  return (
    <div className="space-y-4">
      <div>
        {data ? (
          <BaseFilter
            paramsFilter={filter}
            setParamsFilter={setFilter}
            title="Filter"
            dataFormFilter={[
              {
                name: 'division',
                label: 'Divisi',
                type: 'select',
                options: [
                  { label: 'Cuti', id: 'time_off' },
                  { label: 'Shifting', id: 'shifting' },
                  { label: 'Absen', id: 'attendance' }
                ]
              }
            ]}
          />
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
        <BaseInputSearch
          placeholder={`Search Employee...`}
          onChange={(val) =>
            setPaginationAndSearch((p) => ({ ...p, search: val }))
          }
        />
      </div>
      <BaseTable
        columns={columnsEmployee}
        data={data?.data || []}
        loading={isFetching}
      />
      <BasePagination
        currentPage={paginationAndSearch.page}
        itemsPerPage={paginationAndSearch.per_page}
        totalPages={data?.pagination.total_page as number}
        onPageChange={(page) => {
          setPaginationAndSearch((p) => ({ ...p, page }));
        }}
        totalItems={data?.pagination.total_data as number}
        onItemsPerPageChange={(itemsPerPage) => {
          setPaginationAndSearch((p) => ({ ...p, per_page: itemsPerPage }));
        }}
      />
    </div>
  );
};

export default ListEmployee;
