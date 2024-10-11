import BaseInputSearch from '@/components/base-input-search';
import BaseTable from '@/components/base-table';
import { Button } from '@/components/ui/button';
import {
  useDeleteMasterShifting,
  useListMasterShifting
} from '@/hooks/master-shifting.hooks';
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
import BasePagination from '@/components/base-pagination';
import * as XLSX from 'xlsx';
import moment from 'moment';
import BaseConfirm from '@/components/modal/base-confirm';

const ListMasterShifting = () => {
  const { mutate, status } = useDeleteMasterShifting();
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

  const downloadExcel = () => {
    // await refetch();

    if (!data?.data?.length) return;

    // Membuat worksheet dari array data
    const worksheet = XLSX.utils.json_to_sheet(
      data.data.map((item) => ({
        'Kode Master Shifting': item.code,
        'Nama Master Shifting': item.name,
        'Jam Mulai': item.entry_hours,
        'Jam Berakhir': item.leave_hours
      }))
    );

    // Membuat workbook dan menambahkan worksheet ke dalamnya
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Data Master Shifting ${moment().format('YYYY-MM-DD')}`
    );

    // Mengunduh file Excel
    XLSX.writeFile(
      workbook,
      `${moment().format('YYYY-MM-DD')}_data_master_shifting.xlsx`
    );
  };
  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
  useEffect(() => {
    if (status === 'success') {
      setDialog((p) => ({ ...p, delete: false }));
    }
  }, [status]);
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
            <DropdownMenuItem
              // onClick={}
              onClick={() => {
                setSelectedData(row.original);
                setDialog((p) => ({ ...p, delete: true }));
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
        <BaseInputSearch placeholder="Cari Karyawan" onChange={handleSearch} />
        <Button onClick={downloadExcel}>
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
      <FormMasterShifting
        typeForm="update"
        data={selectedData}
        isOpen={dialog.update}
        onClose={() => {
          setDialog((p) => ({ ...p, update: false }));
        }}
      />

      <BaseConfirm
        isOpen={dialog.delete}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, delete: !p.delete }));
        }}
        onConfirm={() => mutate(selectedData?.id as string)}
        status={status}
        textBtnConfirm="Hapus"
        title="Hapus Master Shifting"
        variant="destructive"
        description={`Apakah anda yakin ingin menghapus master shifting ini?`}
      />
    </div>
  );
};

export default ListMasterShifting;
