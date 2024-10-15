import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Separator } from '@/components/ui/separator';
import BaseTable from '@/components/base-table';
import moment from 'moment';
import { ColumnDef } from '@tanstack/react-table';
import { ShiftingType } from '@/types/shifting.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { CircleAlert } from 'lucide-react';
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
  // {
  //   accessorKey: 'code',
  //   header: 'Kode',
  //   cell: ({ row, column, getValue }) => (
  //     <p className="!text-blue-500">{row.original.code}</p>
  //   )
  // },
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
    // moment(row.original.shifting_date_end).format('DD MMMM YYYY')
  }
];

interface PropsType {
  dataShifting: ShiftingType[];
}
const PdfViewer: React.FC<PropsType> = ({ dataShifting }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  // Function to generate PDF
  const generatePdf = () => {
    const input = reportRef.current;
    if (!input) return; // Make sure the ref exists

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report_karyawan.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  return (
    <div className="relative mx-32  rounded-md border">
      <div className="flex items-end justify-between">
        <div className=" w-12 rounded-br-md rounded-tl-md bg-red-600 text-center text-white">
          PDF
        </div>
        <p
          onClick={generatePdf}
          className="mr-4 cursor-pointer text-xs text-blue-500 underline"
        >
          Download PDF
        </p>
      </div>
      <div ref={reportRef} className="space-y-4 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Report Data Karyawan</h1>
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <small> PT Cuy Sejahtera</small>
              <small className="text-neutral-500">
                {' '}
                Data periode tanggal 21 September 2023 - 01 Oktober 2023{' '}
              </small>
            </div>
            <p>Dibuat tanggal 01 Desember 2024</p>
          </div>
        </div>
        <Separator />
        <div className="">
          {dataDetail.map((val, index) => {
            return (
              <div className="flex border-b py-2" key={index}>
                <p className="min-w-[250px]">{val.key}</p>
                <p>: {val.value}</p>
              </div>
            );
          })}
        </div>

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
