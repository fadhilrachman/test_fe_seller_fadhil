'use client';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useListApproval } from '@/hooks/approval';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ApprovalModal } from './approval-modal';
import { ApprovalType } from '@/types/approval';
import {
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Trash,
  X
} from 'lucide-react';
import { FilterApproval } from './filter-approval';
import BaseInputSearch from '@/components/base-input-search';
import BaseTable from '@/components/base-table';
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
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

const ListApproval = () => {
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
    },

    {
      accessorKey: '',
      header: 'AKSI',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => {
            setSelectData(row.original);
            handleOpenCloseDialog('approval');
          }}
        >
          <span className="sr-only">Open menu</span>
          <IconFeedback className="h-4 w-4" />
        </Button>
      )
    }
  ];
  const IconFeedback = Icons['feedback'];
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    search: ''
  });
  const [filter, setFilter] = useState({
    approval_type: { id: '', label: '' },
    division_id: { id: '', label: '' }
  });
  const [dialog, setDialog] = useState({ approval: false, filter: false });
  const [selectData, setSelectData] = useState<ApprovalType>();
  const IconFile = Icons['file'];
  const searchParams = useSearchParams();
  const status = searchParams.get('tabs') || 'waiting_approval';
  const { data, refetch, isFetching } = useListApproval({
    status,
    ...paginationAndSearch,
    division_id: filter.division_id.id,
    approval_type: filter.approval_type.id
  });
  const approvalType = {
    attendance: 'Izin Sakit',
    shifting: 'Shifting',
    time_off: 'Cuti'
  };
  const handleOpenCloseDialog = (params: keyof typeof dialog) => {
    setDialog((p) => ({ ...p, [params]: !p[params] }));
  };

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [status, paginationAndSearch, filter]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between space-x-2">
        <div className="flex space-x-2">
          <FilterApproval
            paramsFilter={filter}
            dataFormFilter={[
              {
                name: 'approval_type',
                placeholder: 'Tipe Perizinan',
                label: 'Tipe Perizinan',
                type: 'select',
                options: [
                  { label: 'Cuti', id: 'time_off' },
                  { label: 'Shifting', id: 'shifting' },
                  { label: 'Absen', id: 'attendance' }
                ]
              },
              {
                name: 'division_id',
                placeholder: 'Divisi',
                label: 'Divisi',
                helperText: 'this is data bla bla',
                type: 'select',
                options: [
                  { label: 'The Godfather', id: '1' },
                  { label: 'Pulp Fiction', id: '2' }
                ]
              }
            ]}
            setParamsFilter={setFilter}
          />
          <BaseInputSearch
            placeholder="Cari Karyawan"
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-start space-x-2">
          <Button>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <BaseTable
        columns={columns}
        data={data?.data || []}
        loading={isFetching}
      />

      {dialog.approval && (
        <ApprovalModal
          isOpen={dialog.approval}
          data={selectData as ApprovalType}
          onClose={() => {
            handleOpenCloseDialog('approval');
          }}
        />
      )}
    </div>
  );
};

export default ListApproval;
