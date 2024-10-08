import FormGenerator, { DataFormType } from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useCreateMasterShifting } from '@/hooks/master-shifting.hooks';
import { useListEmployee } from '@/hooks/useEmployee';
import { CreateTimeOffType } from '@/types/time-off.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function FormTimeOff(props: Props) {
  const { mutate, status } = useCreateMasterShifting();
  const { data: dataEmployee } = useListEmployee({ page: 1, per_page: 1000 });
  const optionsEmployee = dataEmployee?.data.map((val) => ({
    id: val.id,
    label: val.name
  }));
  const form = useForm({
    resolver: zodResolver(CreateTimeOffType)
  });
  const dataForm: DataFormType[] = [
    {
      name: 'user_id',
      type: 'comobox',
      placeholder: 'Pilih Karyawan',
      label: 'Karyawan',
      options: optionsEmployee
    },
    {
      name: 'type',
      type: 'select',
      placeholder: 'Pilih Tipe Cuti',
      label: 'Tipe Cuti',
      options: [
        {
          id: 'yearly',
          label: 'Tahunan'
        },
        {
          id: 'give_birth',
          label: 'Melahirkan'
        },
        {
          id: 'death',
          label: 'Kematian'
        },
        {
          id: 'hajj_pilgrimage',
          label: 'Haji'
        }
      ]
    },
    {
      name: 'start_date',
      placeholder: '17:00',
      type: 'date',
      label: 'Tanggal Mulai',
      grid: 2
    },
    {
      name: 'end_date',
      type: 'date',
      placeholder: '',
      label: 'Tanggal Berakhir',
      grid: 2
    },

    {
      name: 'description',
      type: 'textarea',
      placeholder: '',
      label: 'Deskripsi'
    }
  ];

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
      form.reset();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Tambah Cuti</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={async (val: any) => {
            await mutate(val);
          }}
          data={dataForm}
        />
        <DialogFooter>
          <Button type="button" onClick={props.onClose} variant={'ghost'}>
            Kembali
          </Button>
          <Button type="submit" form="form" loading={status == 'pending'}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
