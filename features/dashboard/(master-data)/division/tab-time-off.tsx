import BasePagination from '@/components/base-pagination';
import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { useListTimeOff } from '@/hooks/time-off.hook';
import { STATUS, STATUS_COLOR, TIME_OFF } from '@/lib/constants';
import { ShiftingType } from '@/types/shifting.type';
import { TimeOffType } from '@/types/time-off.type';
import { ColumnDef } from '@tanstack/react-table';
import { CircleAlert, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';

function TabTimeOff({ divisionId }: { divisionId: string }) {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });

  const { data, refetch, isFetching } = useListTimeOff({
    ...paginationAndSearch,
    division_id: divisionId
  });

  const columns: ColumnDef<TimeOffType>[] = [
    {
      accessorKey: 'name',
      header: 'NAMA',
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
      accessorKey: 'start_date',
      header: 'Tanggal Mulai',
      cell: ({ row }) => moment(row.original.start_date).format('DD MMMM YYYY')
    },
    {
      accessorKey: 'end_date',
      header: 'Tanggal Berakhir',
      cell: ({ row }) => moment(row.original.end_date).format('DD MMMM YYYY')
    },

    {
      accessorKey: 'type',
      header: 'Tipe Cuti',
      cell: ({ row }) => <Badge>{TIME_OFF[row.original.type]}</Badge>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={STATUS_COLOR[row.original.status] as any}>
          {STATUS[row.original.status]}
        </Badge>
      )
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
    //         // onClick={() => router.push(`/dashboard/user/${data.id}`)}
    //         >
    //           <Edit className="mr-2 h-4 w-4" /> Update
    //         </DropdownMenuItem>
    //         <DropdownMenuItem>
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

export default TabTimeOff;
