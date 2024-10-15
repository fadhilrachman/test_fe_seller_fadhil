'use client';

import FormGenerator from '@/components/form-generator';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useListDivision } from '@/hooks/useDivision';
import { useCreateEmployee } from '@/hooks/useEmployee';
import { CreateEmployeSchema } from '@/types/employe';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

export function CreateEmployee() {
  const { mutate, status } = useCreateEmployee();
  const { data, isFetching } = useListDivision({
    per_page: 10000
  });

  const form = useForm({
    resolver: zodResolver(CreateEmployeSchema)
  });

  if (isFetching) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Skeleton className="h-32 w-full rounded bg-[#E1E3E5]" />
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="col-span-6">
              <Skeleton className="h-12 w-full rounded bg-[#E1E3E5]" />
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center">
          <Skeleton className="h-12 w-40 rounded bg-[#E1E3E5]" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center">
        <Alert variant="destructive">
          Failed to fetch division data. Please try again later.
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FormGenerator
        form={form}
        id="form"
        onSubmit={(val: any) => {
          form.reset();
          mutate(val);
        }}
        grid={12}
        data={[
          {
            name: 'avatar',
            type: 'upload',
            label: 'Upload Avatar'
          },
          {
            name: 'name',
            type: 'text',
            placeholder: 'John doe',
            label: 'Nama Karyawan',
            grid: 6
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'john@gmail.com',
            grid: 6
          },
          {
            name: 'phone',
            placeholder: '62887665677',
            type: 'text',
            label: 'No Telepon',
            grid: 6
          },
          {
            name: 'nik',
            type: 'text',
            label: 'NIK',
            placeholder: '123456789',
            grid: 6
          },
          {
            name: 'division_id',
            type: 'select',
            placeholder: 'Pilih Divisi',
            label: 'Divisi',
            grid: 6,
            options: data?.data.map((val) => ({
              id: val.id,
              label: val.name
            }))
          },
          {
            name: 'address',
            placeholder: 'Jl. Raya Cimahi',
            type: 'text',
            grid: 6,
            label: 'Tempat'
          },
          {
            name: 'dob',
            type: 'date',
            grid: 6,
            label: 'Tanggal Lahir'
          },
          {
            name: 'pob',
            type: 'text',
            grid: 6,
            placeholder: 'Cimahi',
            label: 'Tempat Lahir'
          },
          {
            name: 'job_title',
            placeholder: 'Front end',
            type: 'text',
            grid: 6,
            label: 'Profesi'
          },
          {
            name: 'region',
            placeholder: 'Bandung',
            type: 'text',
            grid: 6,
            label: 'Wilayah'
          }
        ]}
      />
      <div className="flex w-full items-center justify-end">
        <Button
          variant="default"
          type="submit"
          form="form"
          className="!min-w-40"
          loading={status == 'pending'}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
