'use client';
import BaseTable from '@/components/base-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Edit, FileIcon, MoreHorizontal, Trash, X } from 'lucide-react';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Shifting', link: '/dashboard/shifting' },
  { title: 'Import', link: '/dashboard/shifting/import' }
];

const Page = () => {
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State untuk menyimpan file yang di-upload

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file); // Simpan file yang di-upload
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setEmployeeData(jsonData); // Simpan data yang diimpor ke state
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ],
      'application/vnd.ms-excel': ['.xls']
    },
    onDropAccepted: (files) => {
      console.log('File diterima:', files);
    },
    onDropRejected: (fileRejections) => {
      console.log('File ditolak:', fileRejections);
    }
  });

  // Fungsi untuk export data karyawan ke file Excel
  const downloadExample = async () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        Nama: 'Example Name',
        NIK: 'Example NIK',
        'Nomor Telepon': '08122378556',
        Email: 'Example@example.com',
        'Tanggal Lahir': 'Example Tanggal Lahir',
        'Tempat Lahir': 'Example Tempat Lahir',
        Profesi: 'Example Job Title',
        Alamat: 'Example Address',
        Negara: 'indonesia',
        Domisili: 'Example Location',
        Divisi: '00834JHG73as'
      }
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Karyawan');

    XLSX.writeFile(workbook, 'example_data_karyawan.xlsx');
  };

  // Fungsi untuk menghapus file yang diunggah
  const removeFile = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setUploadedFile(null); // Hapus file dari state
    setEmployeeData([]); // Hapus data dari state
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Import Shifting`} description="Manage Divisi" />
        <div className="mt-4 flex justify-end">
          <Button onClick={() => downloadExample()}>
            Download Contoh Data
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div
          {...getRootProps()}
          className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6"
        >
          <Input type="file" className="hidden" {...getInputProps()} />
          {uploadedFile ? (
            <div className="flex w-full items-center justify-between  space-x-2 rounded-sm border-2 p-2 text-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <FileIcon className="h-7 w-7" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <>
              <FileIcon className="h-12 w-12" />
              <span className="text-sm font-medium text-gray-500">
                Drag and drop a .xlsx or .xls file or click to browse
              </span>
              <span className="text-xs text-gray-500">
                Only .xlsx and .xls files are allowed
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col items-end justify-end">
          <Button>Import</Button>
          <p className="text-xs text-neutral-400">
            *Import untuk menyimpan data
          </p>
        </div>
      </div>

      <BaseTable
        columns={[
          {
            accessorKey: 'Nama',
            header: 'NAME',
            cell: ({ row }) => (
              <div className="flex items-center space-x-1">
                <span>{row?.original?.Nama}</span>
              </div>
            )
          },
          {
            accessorKey: 'NIK',
            header: 'NIK'
          },
          {
            accessorKey: 'Nomor Telepon',
            header: 'NO. TELP'
          },
          {
            accessorKey: 'Email',
            header: 'EMAIL'
          },
          {
            accessorKey: 'Tanggal Lahir',
            header: 'TANGGAL LAHIR'
          },
          {
            accessorKey: 'Tempat Lahir',
            header: 'TEMPAT LAHIR'
          },
          {
            accessorKey: 'Profesi',
            header: 'PROFESI'
          },
          {
            accessorKey: 'Alamat',
            header: 'ALAMAT'
          },
          {
            accessorKey: 'Negara',
            header: 'NEGARA'
          },
          {
            accessorKey: 'Division',
            header: 'DIVISI',
            cell: ({ row }) => <>{row.original?.division?.name || 'IT'}</>
          },
          {
            accessorKey: 'NIK',
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
                  <DropdownMenuItem onClick={() => {}}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <Trash className="mr-2 h-4 w-4" /> Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        ]}
        data={employeeData}
      />
    </div>
  );
};

export default Page;
