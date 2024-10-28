import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Separator } from '@/components/ui/separator';
import BaseTable from '@/components/base-table';
import moment from 'moment';
import { ColumnDef } from '@tanstack/react-table';
import { ShiftingType } from '@/types/shifting.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DataInformation from './data-information-division';
moment.locale('id');
const dataDetail = [
  {
    key: 'Nama',
    value: 'Muhammad Fadhil Rahman'
  },
  {
    key: 'Email',
    value: 'fadhil@gmail.com'
  },
  {
    key: 'NIK',
    value: '1239812931823912'
  },
  {
    key: 'Jabatan',
    value: 'Frontend Develoer'
  },
  {
    key: 'Divisi',
    value: 'IT Management'
  }
];

const columns: ColumnDef<ShiftingType>[] = [
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
      </div>
    )
  }
];

interface PropsType {
  dataShifting: ShiftingType[];
  reportRef: React.RefObject<HTMLDivElement>;
  startDate: string;
  endDate: string;
}
const PdfViewer: React.FC<PropsType> = ({
  dataShifting,
  reportRef,
  startDate,
  endDate
}) => {
  return (
    <div className="relative mx-32  rounded-md border">
      <div className="flex items-end justify-between">
        <div className=" w-12 rounded-br-md rounded-tl-md bg-red-600 text-center text-white">
          PDF
        </div>
      </div>
      <div ref={reportRef} className="space-y-4 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Report Data Karyawan</h1>
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <small> PT Cuy Sejahtera</small>
              <small className="text-neutral-500">
                {' '}
                Data periode tanggal {moment(startDate).format(
                  'DD MMMM YYYY'
                )}- {moment(endDate).format('DD MMMM YYYY')}{' '}
              </small>
            </div>
            <p>Dibuat tanggal {moment().format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <Separator />
        <DataInformation dataDetail={dataDetail} />

        <div className="">
          <h3 className="mb-4 text-xl font-semibold">Data Shifting </h3>
          <BaseTable columns={columns} data={dataShifting || []} />
        </div>
        <div className="">
          <h3 className="mb-4 text-xl font-semibold">Data Cuti </h3>
          <BaseTable columns={columns} data={dataShifting || []} />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
