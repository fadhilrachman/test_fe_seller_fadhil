'use client';
import BaseInputSearch from '@/components/base-input-search';
import BasePagination from '@/components/base-pagination';
import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useDeleteShifting, useListShifting } from '@/hooks/shifting.hook';
import { ShiftingType } from '@/types/shifting.type';
import { ColumnDef } from '@tanstack/react-table';
import {
  CircleAlert,
  Download,
  Edit,
  MoreHorizontal,
  Trash
} from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FormShifting } from './form-shifting';
import BaseConfirm from '@/components/modal/base-confirm';

const ListShifting = () => {
  const [dialog, setDialog] = useState({ update: false, delete: false });
  const [selectData, setSelectData] = useState<ShiftingType>();
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { mutate, status } = useDeleteShifting();
  const { data, refetch, isFetching } = useListShifting(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
  useEffect(() => {
    if (status === 'success') {
      setDialog((p) => ({ ...p, delete: false }));
    }
  }, [status]);

  const columns: ColumnDef<ShiftingType>[] = [
    // {
    //   accessorKey: 'code',
    //   header: 'Kode',
    //   cell: ({ row, column, getValue }) => (
    //     <p className="!text-blue-500">{row.original.code}</p>
    //   )
    // },
    {
      accessorKey: 'name',
      header: 'NAME',
      cell: ({ row, column, getValue }) => (
        <div className="flex items-center space-x-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.user.name}</span>
            <small className="text-gray-500">{row.original.user.email}</small>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'shifting_date_start',
      header: 'Tanggal Mulai',
      cell: ({ row }) =>
        moment(row.original.shifting_date_start).format('DD MMMM YYYY')
    },
    {
      accessorKey: 'shifting_date_end',
      header: 'Tanggal Berakhir',
      cell: ({ row }) =>
        moment(row.original.shifting_date_end).format('DD MMMM YYYY')
    },
    {
      accessorKey: 'master_shifting',
      header: 'Shift',
      cell: ({ row }) => (
        <div className="flex items-center space-x-1">
          <span> {row.original.master_shifting.name}</span>{' '}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="">
                <p>Jam Masuk : {row.original.master_shifting.entry_hours}</p>
                <p>Jam Pulang : {row.original.master_shifting.leave_hours}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
      // moment(row.original.shifting_date_end).format('DD MMMM YYYY')
    },
    {
      accessorKey: '',
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
                setSelectData(row.original);
                setDialog((p) => ({ ...p, update: true }));
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectData(row.original);
                setDialog((p) => ({ ...p, delete: true }));
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <BaseInputSearch placeholder="Cari Karyawan" onChange={handleSearch} />
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <BaseTable columns={columns} data={data?.data || []} />
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

      {dialog.update && (
        <FormShifting
          isOpen={dialog.update}
          onClose={() => {
            setDialog((p) => ({ ...p, update: false }));
          }}
          typeForm="update"
          data={selectData}
        />
      )}
      <BaseConfirm
        isOpen={dialog.delete}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, delete: !p.delete }));
        }}
        onConfirm={() => mutate(selectData?.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Shifting"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus shifting ini?`}
      />
    </div>
  );
};

export default ListShifting;
