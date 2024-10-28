import BasePagination from '@/components/base-pagination';
import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useListShifting } from '@/hooks/shifting.hook';
import { ShiftingType } from '@/types/shifting.type';
import { ColumnDef } from '@tanstack/react-table';
import { CircleAlert, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

function TabShifting({ divisionId }: { divisionId: string }) {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });

  const { data, refetch, isFetching } = useListShifting({
    ...paginationAndSearch,
    division_id: divisionId
  });

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
    }
    // {
    //   accessorKey: '',
    //   header: 'AKSI',
    //   cell: ({ row }) => (
    //     <DropdownMenu modal={false}>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Aksi</DropdownMenuLabel>

    //         <DropdownMenuItem
    //           onClick={() => {
    //             setSelectData(row.original);
    //             setDialog((p) => ({ ...p, update: true }));
    //           }}
    //         >
    //           <Edit className="mr-2 h-4 w-4" /> Update
    //         </DropdownMenuItem>
    //         <DropdownMenuItem
    //           onClick={() => {
    //             setSelectData(row.original);
    //             setDialog((p) => ({ ...p, delete: true }));
    //           }}
    //         >
    //           <Trash className="mr-2 h-4 w-4" /> Delete
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   )
    // }
  ];
  return (
    <div className="space-y-2 rounded-md border p-4">
      <BaseTable
        columns={columns}
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
}

export default TabShifting;
