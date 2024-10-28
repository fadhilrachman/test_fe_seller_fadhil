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
import { useListDivision } from '@/hooks/useDivision';
import BaseConfirm from '@/components/modal/base-confirm';
import { useDeleteEmployee } from '@/hooks/useEmployee';
import * as XLSX from 'xlsx';
import moment from 'moment';

const ListEmployee = () => {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState('');
  const [isDialog, setIsDialog] = useState({
    delete: false,
    filter: false
  });
  const [filter, setFilter] = useState({
    division: { id: '', label: '' }
  });
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });

  const { data, isFetching, refetch } = useListEmployee({
    ...paginationAndSearch,
    division_id: filter.division.id
  });
  const { data: listDivision, isFetching: isFetchingDivisi } = useListDivision({
    per_page: 10000
  });
  const { mutate, status } = useDeleteEmployee();

  const downloadEmployee = async () => {
    if (!data?.data.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      data.data.map((item) => ({
        Nama: item.name,
        Email: item.email,
        NIK: item.nik,
        Divisi: item.division.name,
        Profesi: item.job_title
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Karyawan');

    XLSX.writeFile(
      workbook,
      `${moment().format('YYYY-MM-DD')}_data_karyawan.xlsx`
    );
  };

  const columnsEmployee: ColumnDef<EmployeDtoType>[] = [
    {
      accessorKey: 'nik',
      header: 'ID KARYAWAN',
      maxSize: 3,
      enableResizing: true,
      enableColumnFilter: true,
      enableSorting: true
    },
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: ({ row }) => (
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
                router.push(
                  `/dashboard/employees/${row.original.id}/detail-employee`
                );
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
            <DropdownMenuItem
              onClick={() => {
                setEmployeeId(row.original.id);
                setIsDialog({ ...isDialog, delete: true });
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  useEffect(() => {
    refetch();
  }, [paginationAndSearch, filter]);

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <BaseFilter
            paramsFilter={filter}
            setParamsFilter={setFilter}
            dataFormFilter={[
              {
                name: 'division',
                placeholder: 'Pilih Divisi',
                label: 'Divisi',
                type: 'select',
                options: listDivision?.data?.map((item) => ({
                  id: item.id,
                  label: item.name
                }))
              }
            ]}
          />
          <BaseInputSearch
            placeholder={`Search Karyawan...`}
            onChange={(val) =>
              setPaginationAndSearch((p) => ({ ...p, search: val }))
            }
          />
        </div>
        <div className="space-x-4">
          <Button
            onClick={() => router.push('/dashboard/employees/import-employees')}
          >
            Import
          </Button>
          <Button onClick={() => downloadEmployee()}>Download</Button>
        </div>
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

      <BaseConfirm
        isOpen={isDialog.delete}
        onOpenChange={() => {
          setIsDialog((prev) => ({ ...prev, delete: false }));
        }}
        onConfirm={() => mutate(employeeId)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Karyawan"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus Karyawan ini?`}
      />
    </div>
  );
};

export default ListEmployee;
