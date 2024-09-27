'use client';
import BaseTable from '@/components/base-table';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { columnsDivision } from './contants-division';
import { useListDivision } from '@/hooks/useDivision';
import BasePagination from '@/components/base-pagination';

const ListDivision = () => {
  const [currentPage, setCurrentPage] = useState(1); // Menambahkan state untuk halaman
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data, refetch } = useListDivision({
    page: currentPage // Menambahkan parameter halaman ke API
  });

  useEffect(() => {
    refetch(); // Memanggil ulang data saat currentPage berubah
  }, [currentPage, refetch]);

  return (
    <div className="space-y-4">
      <div>
        <Input placeholder={`Cari Divisi`} className="w-full md:max-w-sm" />
      </div>
      <BaseTable columns={columnsDivision} data={data?.data || []} />
      <BasePagination
        currentPage={currentPage}
        totalPages={10}
        totalItems={data?.pagination.total_data || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
        onItemsPerPageChange={(itemsPerPage: number) =>
          setItemsPerPage(itemsPerPage)
        }
      />
    </div>
  );
};

export default ListDivision;
