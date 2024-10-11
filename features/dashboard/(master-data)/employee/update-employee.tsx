import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEmployeeById, useUpdateEmployee } from '@/hooks/useEmployee';
import { useListDivision } from '@/hooks/useDivision';
import { CreateEmployeSchema } from '@/types/employe';
import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';

export function UpdateEmployee() {
  const { employeeId } = useParams();
  const { mutate, status } = useUpdateEmployee(employeeId as string);
  const { data, isFetching } = useListDivision({ per_page: 10000 });
  const { data: dataEmployee, isFetching: isFetchingEmployee } =
    useEmployeeById(employeeId);

  // Inisialisasi form dengan zod resolver
  const form = useForm({
    resolver: zodResolver(CreateEmployeSchema),
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
      phone: '',
      division_id: '',
      job_title: '',
      nik: '',
      pob: '',
      dob: '',
      address: '',
      region: ''
    }
  });

  // Update nilai form ketika data employee di-fetch
  useEffect(() => {
    if (dataEmployee?.data) {
      form.reset({
        avatar: dataEmployee?.data?.avatar || '',
        name: dataEmployee?.data?.name || '',
        email: dataEmployee?.data?.email || '',
        phone: dataEmployee?.data?.phone || '',
        division_id: dataEmployee?.data?.division_id || '',
        job_title: dataEmployee?.data?.job_title || '',
        nik: dataEmployee?.data?.nik || '',
        pob: dataEmployee?.data?.pob || '',
        dob: dataEmployee?.data?.dob || '',
        address: dataEmployee?.data?.address || '',
        region: dataEmployee?.data?.region || ''
      });
    }
  }, [dataEmployee?.data, form]);

  // Tampilkan skeleton loading jika data masih di-fetch
  if (isFetching || isFetchingEmployee) {
    return (
      <div className="space-y-6">
        <SkeletonLoader />
      </div>
    );
  }

  // Tampilkan error jika gagal mem-fetch data
  if (!data || !dataEmployee) {
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
          mutate(val);
          // form.reset();
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
            placeholder: 'Pilih Divisi',
            label: 'Divisi',
            grid: 6,
            options: data?.data.map((val: any) => ({
              id: val.id,
              label: val.name
            }))
          },
          {
            name: 'address',
            type: 'text',
            grid: 6,
            label: 'Alamat'
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
            label: 'Tempat Lahir'
          },
          {
            name: 'job_title',
            type: 'text',
            grid: 6,
            label: 'Profesi'
          },
          {
            name: 'region',
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
          loading={status === 'pending'}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}

// Komponen Skeleton untuk loading state
function SkeletonLoader() {
  return (
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
  );
}
