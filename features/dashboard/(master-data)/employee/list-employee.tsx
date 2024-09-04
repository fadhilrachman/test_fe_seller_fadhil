'use client';
import BaseTable from '@/components/base-table';
import { Input } from '@/components/ui/input';
import { useListEmployee } from '@/hooks/useEmployee';
import React from 'react';
import { columnsEmployee } from './constants';

const ListEmployee = () => {
  const { data } = useListEmployee({});
  console.log({ data });

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder={`Search Employee...`}
          className="w-full md:max-w-sm"
        />
      </div>
      <BaseTable columns={columnsEmployee} data={data?.data || []} />
    </div>
  );
};

export default ListEmployee;
