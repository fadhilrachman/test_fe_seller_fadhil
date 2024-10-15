import BaseTable from '@/components/base-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  ENTRY_STATUS_ATTENDANCE,
  LEAVE_STATUS_ATTENDANCE
} from '@/lib/constants';
import { HistoryAttendanceType } from '@/types/attendance.type';
import { ColumnDef } from '@tanstack/react-table';
import { CircleAlert } from 'lucide-react';
import moment from 'moment';
import React from 'react';

const columns: ColumnDef<HistoryAttendanceType>[] = [
  //   {
  //     accessorKey: 'name',
  //     header: 'Nama Karyawan',
  //     cell: ({ row, column, getValue }) => {
  //       const { user } = row.original;
  //       const {
  //         entry_time: entry_time_division,
  //         name,
  //         leave_time
  //       } = user?.division;
  //       return (
  //         <div className="flex items-center space-x-1">
  //           <Avatar className="h-8 w-8">
  //             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  //             <AvatarFallback>CN</AvatarFallback>
  //           </Avatar>
  //           <div className="flex flex-col">
  //             <div className="flex space-x-2">
  //               <span>{row.original.user.name}</span>
  //               <TooltipProvider>
  //                 <Tooltip>
  //                   <TooltipTrigger asChild>
  //                     <CircleAlert className="h-4 w-4 text-gray-500" />
  //                   </TooltipTrigger>
  //                   <TooltipContent className="w-[200px]">
  //                     Karyawan ini mengikuti jadwal presensi divisi{' '}
  //                     <span className="font-bold underline">{name}</span>, dengan
  //                     ketentuan jam masuk:{' '}
  //                     <span className="font-bold underline">
  //                       {entry_time_division}
  //                     </span>{' '}
  //                     dan jam pulang:{' '}
  //                     <span className="font-bold underline">{leave_time}</span>
  //                   </TooltipContent>
  //                 </Tooltip>
  //               </TooltipProvider>
  //             </div>
  //             <small className="text-gray-500">{row.original.user.email}</small>
  //           </div>
  //         </div>
  //       );
  //     }
  //   },
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
      const { entry_location, entry_status, entry_time, entry_img, shifting } =
        row.original;

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
      const { leave_location, leave_status, leave_time, leave_img, shifting } =
        row.original;
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
interface PropsType {
  dataAttendance: HistoryAttendanceType[];
}
const ExcelPage: React.FC<PropsType> = ({ dataAttendance }) => {
  return <BaseTable columns={columns} data={dataAttendance || []} />;
};

export default ExcelPage;
