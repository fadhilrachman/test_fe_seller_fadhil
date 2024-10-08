import BaseInputSearch from '@/components/base-input-search';
import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useListHistoryAttendance } from '@/hooks/history-attendance.hook';
import {
  ENTRY_STATUS_ATTENDANCE,
  LEAVE_STATUS_ATTENDANCE
} from '@/lib/constants';
import { HistoryAttendanceType } from '@/types/attendance.type';
import { ColumnDef } from '@tanstack/react-table';
import { CircleAlert, Download } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { BaseFilter } from '@/components/base-filter';
import BasePagination from '@/components/base-pagination';
const ListHistoryAttendance = () => {
  const columns: ColumnDef<HistoryAttendanceType>[] = [
    {
      accessorKey: 'name',
      header: 'Nama Karyawan',
      cell: ({ row, column, getValue }) => {
        const { user } = row.original;
        const {
          entry_time: entry_time_division,
          name,
          leave_time
        } = user?.division;
        return (
          <div className="flex items-center space-x-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex space-x-2">
                <span>{row.original.user.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleAlert className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[200px]">
                      Karyawan ini mengikuti jadwal presensi divisi{' '}
                      <span className="font-bold underline">{name}</span>,
                      dengan ketentuan jam masuk:{' '}
                      <span className="font-bold underline">
                        {entry_time_division}
                      </span>{' '}
                      dan jam pulang:{' '}
                      <span className="font-bold underline">{leave_time}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <small className="text-gray-500">{row.original.user.email}</small>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'user',
      header: 'Divisi',
      cell: ({ row }) => row.original.user.division?.name
    },
    {
      accessorKey: 'entry_time',
      header: 'Tanggal',
      cell: ({ row }) => moment(row.original.entry_time).format('DD MMMM YYYY')
    },
    {
      accessorKey: 'entry_time',
      header: 'Waktu Masuk',
      cell: ({ row }) => {
        const {
          entry_location,
          entry_status,
          entry_time,
          entry_img,
          shifting
        } = row.original;

        return entry_time ? (
          <div>
            <div className="flex space-x-2">
              <div className="relative">
                <p>{moment(entry_time).format('HH:mm')}</p>{' '}
                {/* <div className="w-max ">Shift Pagi</div> */}
                {shifting && (
                  <Badge className="absolute -right-14 -top-1 h-3 !w-max p-1.5 text-[9px]">
                    {shifting.master_shifting.name}
                  </Badge>
                )}
              </div>
            </div>
            <a
              href={entry_img}
              target="_blank"
              className="text-xs text-blue-500 underline"
            >
              Foto Masuk
            </a>
          </div>
        ) : (
          <p className="ml-3">-</p>
        );
      }
    },
    {
      accessorKey: 'entry_status',
      header: 'Status Masuk',
      cell: ({ row }) => {
        const { entry_location, entry_status, entry_time, entry_img } =
          row.original;
        return entry_time ? (
          <Badge
            variant={ENTRY_STATUS_ATTENDANCE[entry_status].variant_badge as any}
          >
            {ENTRY_STATUS_ATTENDANCE[entry_status].label}
          </Badge>
        ) : (
          <p className="ml-3">-</p>
        );
      }
    },

    {
      accessorKey: 'leave_time',
      header: 'Waktu Pulang',
      cell: ({ row }) => {
        const {
          leave_location,
          leave_status,
          leave_time,
          leave_img,
          shifting
        } = row.original;
        return leave_time ? (
          <div>
            <div className="flex space-x-2">
              <div className="relative">
                <p>{moment(leave_time).format('HH:mm')}</p>{' '}
                {/* <div className="w-max ">Shift Pagi</div> */}
                {shifting && (
                  <Badge className="absolute -right-14 -top-1 h-3 !w-max p-1.5 text-[9px]">
                    {shifting.master_shifting.name}
                  </Badge>
                )}
              </div>
            </div>
            <a
              href={leave_img}
              target="_blank"
              className="text-xs text-blue-500 underline"
            >
              Foto Masuk
            </a>
          </div>
        ) : (
          <p className="ml-3">-</p>
        );
      }
    },
    {
      accessorKey: 'leave_status',
      header: 'Status Pulang',
      cell: ({ row }) => {
        const { leave_location, leave_status, leave_time, leave_img } =
          row.original;
        return leave_time ? (
          <Badge
            variant={LEAVE_STATUS_ATTENDANCE[leave_status].variant_badge as any}
          >
            {LEAVE_STATUS_ATTENDANCE[leave_status].label}
          </Badge>
        ) : (
          <p className="ml-3">-</p>
        );
      }
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
  const [filter, setFilter] = useState({
    division: { id: '', label: '' },
    shifting: { id: '', label: '' },
    date: { id: '', label: '' }
  });
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { data, refetch, isFetching } =
    useListHistoryAttendance(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <BaseFilter
            paramsFilter={filter}
            dataFormFilter={[
              {
                label: 'Tanggal',
                type: 'rangedate',
                name: 'date'
              },
              {
                name: 'division',
                placeholder: 'Pilih Divisi',
                label: 'Divisi',
                type: 'select',
                options: [
                  { label: 'Ditolak', id: 'rejected' },
                  { label: 'Disetujui', id: 'approved' }
                ]
              },
              {
                name: 'shifting',
                placeholder: 'Pilih Shift',
                label: 'Shifting',
                type: 'select',
                options: [
                  { label: 'Tahunan', id: 'yearly' },
                  { label: 'Melahirkam', id: 'give_birth' },
                  { label: 'Kematian', id: 'death' },
                  { label: 'Melahirkam', id: 'hajj_pilgrimage' }
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
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
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
};

export default ListHistoryAttendance;
