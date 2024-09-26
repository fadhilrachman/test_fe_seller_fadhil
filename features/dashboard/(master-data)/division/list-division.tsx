'use client';
import BaseTable from '@/components/base-table';
import { Input } from '@/components/ui/input';
import { useListEmployee } from '@/hooks/useEmployee';
import React, { useEffect, useState } from 'react';
import { columnsDivision } from './contants-division';
import { useListDivision } from '@/hooks/useDivision';
import BaseInputSearch from '@/components/base-input-search';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ListDivision = () => {
  const [paginationAndSearch, setPaginationAndSearch] = useState({
    page: 1,
    per_page: 10,
    search: ''
  });
  const { data, refetch, isFetching } = useListDivision(paginationAndSearch);

  const handleSearch = (val: string) => {
    setPaginationAndSearch((p) => ({ ...p, search: val }));
  };

  useEffect(() => {
    refetch();
  }, [paginationAndSearch]);
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
    </div>
  );
};

export default ListDivision;
