import BaseInputSearch from '@/components/base-input-search';
import BaseTable from '@/components/base-table';
import { Button } from '@/components/ui/button';
import { useListMasterShifting } from '@/hooks/master-shifting.hooks';
import { MasterShiftingType } from '@/types/master-shifting.type';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Edit, MoreHorizontal, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { FormMasterShifting } from './form-master-shifting';

const ListMasterShifting = () => {
  const [dialog, setDialog] = useState({ update: false, delete: false });
  const [selectedData, setSelectedData] = useState<MasterShiftingType>();
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { data, refetch, isFetching } =
    useListMasterShifting(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);

  const columns: ColumnDef<MasterShiftingType>[] = [
    {
      accessorKey: 'code',
      header: 'Kode',
      cell: ({ row, column, getValue }) => (
        <p className="!text-blue-500">{row.original.code}</p>
      )
    },

    {
      accessorKey: 'name',
      header: 'Nama',
      // size: 10
      maxSize: 3,
      enableResizing: true,
      enableColumnFilter: true,
      enableSorting: true
    },
    {
      accessorKey: 'entry_hours',
      header: 'Jam Masuk'
    },
    {
      accessorKey: 'leave_hours',
      header: 'Jam Pulang'
    },
    {
      accessorKey: '',
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

            <DropdownMenuItem
              onClick={() => {
                setSelectedData(row.original);
                setDialog((p) => ({ ...p, update: true }));
              }}
              // onClick={() => router.push(`/dashboard/user/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem>
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
        <BaseInputSearch placeholder="Cari Karyawan" onChange={handleSearch} />
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
      <FormMasterShifting
        typeForm="update"
        data={selectedData}
        isOpen={dialog.update}
        onClose={() => {
          setDialog((p) => ({ ...p, update: false }));
        }}
      />
    </div>
  );
};

export default ListMasterShifting;
