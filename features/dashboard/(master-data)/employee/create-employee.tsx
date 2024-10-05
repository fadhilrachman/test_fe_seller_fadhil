'use client';

import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { useCreateEmployee } from '@/hooks/useEmployee';
import { CreateDivisionSchema } from '@/types/division';
import { zodResolver } from '@hookform/resolvers/zod';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function CreateEmployee() {
  const { mutate, status } = useCreateEmployee();
  const form = useForm({
    resolver: zodResolver(CreateDivisionSchema)
  });

  return (
    <div className="space-y-6">
      <FormGenerator
        form={form}
        id="form"
        onSubmit={(val: any) => {
          mutate(val);
        }}
        grid={6}
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
            label: 'Nama Karyawan'
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'john@gmail.com'
          },
          {
            name: 'phone',
            placeholder: '62887665677',
            type: 'text',
            label: 'No Telepon'
          },
          {
            name: 'nik',
            type: 'text',
            label: 'NIK'
          },
          {
            name: 'division_id',
            type: 'text',
            placeholder: 'Code',
            label: 'Code Divisi'
          },
          {
            name: 'address',
            placeholder: '17:00',
            type: 'text',
            label: 'Tempat'
          },
          {
            name: 'dob',
            placeholder: 'test',
            type: 'text',
            label: 'Dob'
          },
          {
            name: 'pob',
            placeholder: 'test',
            type: 'text',
            label: 'Pob'
          },
          {
            name: 'job_title',
            placeholder: 'Front end',
            type: 'text',
            label: 'Profesi'
          },
          {
            name: 'region',
            placeholder: 'Garut',
            type: 'text',
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
