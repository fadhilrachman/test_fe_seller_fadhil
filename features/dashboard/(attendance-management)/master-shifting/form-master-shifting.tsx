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
import { CreateMasterShiftingType } from '@/types/master-shifting.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function FormMasterShifting(props: Props) {
  const { mutate, status } = useCreateMasterShifting();
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
          <DialogTitle>Tambah Master Shifting</DialogTitle>
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
          grid="1"
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Shift Pagi',
              label: 'Nama Shifting'
            },
            {
              name: 'entry_hours',
              type: 'timepicker',
              placeholder: '17:00',
              label: 'Jam Masuk'
            },
            {
              name: 'leave_hours',
              placeholder: '17:00',
              type: 'timepicker',
              label: 'Jam Pulang'
            },
            {
              name: 'description',
              type: 'textarea',
              placeholder: '',
              label: 'Deskripsi'
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
