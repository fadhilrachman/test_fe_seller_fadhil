'use client';
import React, { useState } from 'react';
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

const ListDivision = () => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionType | null>(
    null
  );
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Tambahkan state untuk kontrol dialog konfirmasi
  const [modalUpdate, setModalUpdate] = useState(false);
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { mutate, status } = useDeleteDivision();
  const { data, isFetching } = useListDivision(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
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
                setSelectedDivision(row.original); // Simpan data divisi yang akan dihapus
                setIsConfirmOpen(true); // Buka dialog konfirmasi
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <BaseInputSearch placeholder="Cari Divisi" onChange={handleSearch} />
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <BaseTable
        columns={columnsDivision}
        data={data?.data || []}
        loading={isFetching}
      />
      <BaseConfirm
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onConfirm={() => mutate(selectedDivision?.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Divisi"
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
