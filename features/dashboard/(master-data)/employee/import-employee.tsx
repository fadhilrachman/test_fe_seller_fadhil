'use client';

import BaseTable from '@/components/base-table';
import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DivisionType } from '@/types/division';
import { CreateEmployeSchema, EmployeeType } from '@/types/employe';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnDef } from '@tanstack/react-table';
import { access } from 'fs';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx';

const ImportEmployee: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(CreateEmployeSchema)
  });
  const [data, setData] = useState<any[]>([]);

  // Fungsi untuk menangani perubahan file input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const binaryStr = event.target?.result as string;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

        // Mengambil data dari sheet pertama
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setData(jsonData); // Simpan data yang di-import
      };
      reader.readAsArrayBuffer(file); // Membaca file dalam bentuk ArrayBuffer
    }
  };

  const columnsDef: ColumnDef<EmployeeType>[] = [
    {
      accessorKey: 'Id',
      header: 'ID'
    },
    {
      accessorKey: 'Name',
      header: 'NAME'
    },
    {
      accessorKey: 'Email',
      header: 'EMAIL'
    },
    {
      accessorKey: 'Phone',
      header: 'PHONE'
    },
    {
      accessorKey: 'Job_title',
      header: 'JOB TITLE'
    },
    {
      accessorKey: 'Division',
      header: 'DIVISI',
      cell: ({ row }) => <>{row.original?.division?.name || 'IT'}</>
    },
    {
      accessorKey: 'Division',
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
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
        />
        <FormGenerator
          data={[
            {
              name: 'import',
              type: 'file',
              label: 'Import'
            }
          ]}
          form={form}
          id="form"
          onSubmit={() => {}}
        />
      </div>
      <BaseTable data={data} columns={columnsDef} />
    </div>
  );
};

export default ImportEmployee;
