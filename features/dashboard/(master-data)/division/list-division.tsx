'use client';
import BaseTable from '@/components/base-table';
import { Input } from '@/components/ui/input';
import { useListEmployee } from '@/hooks/useEmployee';
import React from 'react';
import { columnsDivision } from './contants-division';
import { useListDivision } from '@/hooks/useDivision';

const ListDivision = () => {
  const { data } = useListDivision({});

  return (
    <div className="space-y-4">
      <div>
        <Input placeholder={`Cari Divisi`} className="w-full md:max-w-sm" />
      </div>
      <BaseTable columns={columnsDivision} data={data?.data || []} />
    </div>
  );
};

export default ListDivision;
