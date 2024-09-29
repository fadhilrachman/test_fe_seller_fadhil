import FormGenerator from '@/components/form-generator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateMasterShifting } from '@/hooks/master-shifting.hooks';
import { useCreateDivision } from '@/hooks/useDivision';
import { useListEmployee } from '@/hooks/useEmployee';
import { CreateMasterShiftingType } from '@/types/master-shifting.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function FormShifting(props: Props) {
  const { mutate, status } = useCreateMasterShifting();
  const { data: dataEmployee } = useListEmployee({ page: 1, per_page: 1000 });
  const optionsEmployee = dataEmployee?.data.map((val) => ({
    id: val.id,
    label: val.name
  }));
  const form = useForm({
    resolver: zodResolver(CreateMasterShiftingType)
  });

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
          <DialogTitle>Tambah Shifting</DialogTitle>
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
          data={[
            {
              name: 'user_id',
              type: 'comobox',
              placeholder: 'Pilih Karyawan',
              label: 'Karyawan',
              options: optionsEmployee
            },
            {
              name: 'entry_hours',
              type: 'timepicker',
              placeholder: '17:00',
              label: 'Jam Masuk'
            },
            {
              name: 'shifting_date_start',
              placeholder: '17:00',
              type: 'date',
              label: 'Tanggal Mulai'
            },
            {
              name: 'shifting_date_end',
              type: 'date',
              placeholder: '',
              label: 'Tanggal Berakhir'
            }
          ]}
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
