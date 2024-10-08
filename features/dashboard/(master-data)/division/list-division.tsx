'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import BaseTable from '@/components/base-table';
import { Button } from '@/components/ui/button';
import BaseConfirm from '@/components/modal/base-confirm';
import BaseInputSearch from '@/components/base-input-search';
import { Download, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { useDeleteDivision, useListDivision } from '@/hooks/useDivision';
import { DivisionType } from '@/types/division';
import { UpdateDivision } from './update-division';
import { useRouter } from 'next/navigation';
import BasePagination from '@/components/base-pagination';
import * as XLSX from 'xlsx';

const ListDivision = () => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionType | null>(
    null
  );
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });

  const { data, isFetching, refetch } = useListDivision({
    ...paginationAndSearch,
    per_page: isDownload ? 10000 : paginationAndSearch.per_page,
    search: isDownload ? '' : paginationAndSearch.search
  });

  const router = useRouter();
  const { mutate, status } = useDeleteDivision();

  const handleSearch = (val: string) => {
    setPaginationAndSearch((prev) => ({ ...prev, search: val }));
  };

  const downloadExcel = async () => {
    setIsDownload(true);
    // await refetch();

    if (!data?.data?.length) return;

    // Membuat worksheet dari array data
    const worksheet = XLSX.utils.json_to_sheet(
      data.data.map((item) => ({
        'Kode Divisi': item.code,
        'Nama Divisi': item.name,
        'Jam Masuk': item.entry_time,
        'Jam Pulang': item.leave_time
      }))
    );

    // Membuat workbook dan menambahkan worksheet ke dalamnya
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Divisi');

    // Mengunduh file Excel
    XLSX.writeFile(workbook, 'data_divisi.xlsx');

    setIsDownload(false);
  };

  const columnsDivision: ColumnDef<DivisionType>[] = [
    {
      accessorKey: 'code',
      header: 'Kode',
      cell: ({ row }) => <p className="!text-blue-500">{row.original.code}</p>
    },
    {
      accessorKey: 'name',
      header: 'Nama'
    },
    {
      accessorKey: 'entry_time',
      header: 'Jam Masuk'
    },
    {
      accessorKey: 'leave_time',
      header: 'Jam Pulang'
    },
    {
      accessorKey: '',
      header: 'AKSI',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/division/${row.original.id}`)
              }
            >
              <Eye className="mr-2 h-4 w-4" /> Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedDivision(row.original);
                setModalUpdate(true);
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedDivision(row.original);
                setIsConfirmOpen(true);
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <BaseInputSearch placeholder="Cari Divisi" onChange={handleSearch} />
        <Button onClick={downloadExcel} disabled={isFetching}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <BaseTable
        columns={columnsDivision}
        data={data?.data || []}
        loading={isFetching}
      />
      <BasePagination
        currentPage={paginationAndSearch.page}
        itemsPerPage={paginationAndSearch.per_page}
        totalPages={data?.pagination.total_page as number}
        onPageChange={(page) => setPaginationAndSearch((p) => ({ ...p, page }))}
        totalItems={data?.pagination.total_data as number}
        onItemsPerPageChange={(itemsPerPage) =>
          setPaginationAndSearch((p) => ({ ...p, per_page: itemsPerPage }))
        }
      />
      <BaseConfirm
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onConfirm={() => mutate(selectedDivision?.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Divisi"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus divisi ini?`}
      />
      <UpdateDivision
        isOpen={modalUpdate}
        onClose={() => setModalUpdate(false)}
        division={selectedDivision}
      />
    </div>
  );
};

export default ListDivision;
