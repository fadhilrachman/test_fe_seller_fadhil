'use client';
import { useListEmployee } from '@/hooks/useEmployee';
import React, { useState } from 'react';
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
import { UpdateEmployee } from './updateEmployee';
import { useRouter } from 'next/navigation';

const ListEmployee = () => {
  const { data } = useListEmployee({});
  const [dataEmployee, setDataEmployee] = React.useState<EmployeDtoType | null>(
    null
  );
  const [modalUpdate, setModalUpdate] = useState(false);
  const router = useRouter();

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
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
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
              <Eye className="mr-2 h-4 w-4" /> Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDataEmployee(row.original);
                setModalUpdate(true);
              }}
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

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder={`Search Employee...`}
          className="w-full md:max-w-sm"
        />
      </div>
      <BaseTable columns={columnsEmployee} data={data?.data || []} />
      <UpdateEmployee
        isOpen={modalUpdate}
        onClose={() => setModalUpdate(false)}
        employee={dataEmployee}
      />
    </div>
  );
};

export default ListEmployee;
