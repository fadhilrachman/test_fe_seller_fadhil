'use client';
import BaseInputSearch from '@/components/base-input-search';
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
import { useListShifting } from '@/hooks/shifting.hook';
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

const columns: ColumnDef<ShiftingType>[] = [
  {
    accessorKey: 'code',
    header: 'Kode',
    cell: ({ row, column, getValue }) => (
      <p className="!text-blue-500">{row.original.code}</p>
    )
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row, column, getValue }) => (
      <div className="flex items-center space-x-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{row.original.user.name}</span>
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
          // onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];

const ListShifting = () => {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { data, refetch, isFetching } = useListShifting(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
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
    </div>
  );
};

export default ListShifting;
