import BasePagination from '@/components/base-pagination';
import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useListApproval } from '@/hooks/approval';
import { ApprovalType } from '@/types/approval';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import React, { useState } from 'react';

function TabApproval({ divisionId }: { divisionId: string }) {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });

  const approvalType = {
    attendance: 'Izin Sakit',
    shifting: 'Shifting',
    time_off: 'Cuti'
  };

  const { data, refetch, isFetching } = useListApproval({
    ...paginationAndSearch,
    division_id: divisionId
  });

  const columns: ColumnDef<ApprovalType>[] = [
    // {
    //   accessorKey: 'code',
    //   header: 'Kode',
    //   cell: ({ row, column, getValue }) => (
    //     <p className="!text-blue-500">{row.original.code}</p>
    //   )
    // },
    {
      accessorKey: 'name',
      header: 'NAMa',
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
      accessorKey: 'approval_type',
      header: 'Tipe Izin',
      cell: ({ row }) => (
        <Badge variant={'secondary'}>
          {approvalType[row.original.approval_type]}
        </Badge>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = {
          waiting_approval: 'Menunggu',
          approved: 'Disetujui',
          rejected: 'Ditolak'
        };
        const statusColor = {
          waiting_approval: 'waiting',
          approved: 'approved',
          rejected: 'destructive'
        };
        return (
          <Badge
            variant={
              statusColor[row.original?.status as keyof typeof statusColor] as
                | 'approved'
                | 'default'
                | 'secondary'
                | 'destructive'
                | 'waiting'
                | 'outline'
            }
          >
            {status[row.original?.status as keyof typeof status]}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'start_date',
      header: 'Request Tanggal',
      cell: ({ row }) => (
        <p className="font-medium ">
          {moment(row.original.start_date).format('DD MMMM')} -{' '}
          {moment(row.original.end_date).format('DD MMMM')}
        </p>
      )
    }
    // {
    //   accessorKey: '',
    //   header: 'AKSI',
    //   cell: ({ row }) => (
    //     <Button
    //       variant="ghost"
    //       className="h-8 w-8 p-0"
    //       onClick={() => {
    //         setSelectData(row.original);
    //         handleOpenCloseDialog('approval');
    //       }}
    //     >
    //       <span className="sr-only">Open menu</span>
    //       <IconFeedback className="h-4 w-4" />
    //     </Button>
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

export default TabApproval;
