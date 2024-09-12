'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DivisionType } from '@/types/division';
import { EmployeDtoType } from '@/types/employe';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
// import { CellAction } from './cell-action';

export const columnsDivision: ColumnDef<DivisionType>[] = [
  //   {
  //     accessorKey: 'code',
  //     header: 'Kode',
  //     // size: 10
  //     maxSize: 3,
  //     enableResizing: true,
  //     enableColumnFilter: true,
  //     enableSorting: true
  //   },
  {
    accessorKey: 'code',
    header: 'Kode',
    cell: ({ row, column, getValue }) => (
      <p className="!text-blue-500">{row.original.code}</p>
    )
  },

  {
    accessorKey: 'name',
    header: 'Nama',
    // size: 10
    maxSize: 3,
    enableResizing: true,
    enableColumnFilter: true,
    enableSorting: true
  },

  {
    accessorKey: 'entry_time',
    header: 'Jam Masuk'
  },
  {
    accessorKey: 'leave_time',
    header: 'Jam Pulang'
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
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
