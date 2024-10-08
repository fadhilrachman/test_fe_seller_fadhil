'use client';

import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { useListDivision } from '@/hooks/useDivision';
import { useCreateEmployee } from '@/hooks/useEmployee';
import { CreateDivisionSchema } from '@/types/division';
import { CreateEmployeSchema } from '@/types/employe';
import { zodResolver } from '@hookform/resolvers/zod';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function CreateEmployee() {
  const { mutate, status } = useCreateEmployee();
  // const {} = useListDivision();
  const form = useForm({
    resolver: zodResolver(CreateEmployeSchema)
  });

  return (
    <div className="space-y-6">
      <FormGenerator
        form={form}
        id="form"
        onSubmit={(val: any) => {
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
            grid: 6
          },
          {
            name: 'division_id',
            type: 'select',
            placeholder: 'Front end',
            label: 'Divisi',
            grid: 6,
            options: [
              {
                id: '1',
                label: 'Front end'
              },
              {
                id: '2',
                label: 'Back end'
              }
            ]
          },
          {
            name: 'address',
            placeholder: '17:00',
            type: 'text',
            grid: 6,
            label: 'Tempat'
          },
          {
            name: 'dob',
            placeholder: 'test',
            type: 'text',
            grid: 6,
            label: 'Dob'
          },
          {
            name: 'pob',
            placeholder: 'test',
            type: 'text',
            grid: 6,
            label: 'Pob'
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
            placeholder: 'Garut',
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
