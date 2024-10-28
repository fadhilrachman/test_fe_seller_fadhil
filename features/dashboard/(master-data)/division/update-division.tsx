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
import {
  useCreateDivision,
  useListDivision,
  useUpdateDivision
} from '@/hooks/useDivision';
import { CreateDivisionSchema, DivisionType } from '@/types/division';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  division: DivisionType | null;
}

export function UpdateDivision(props: Props) {
  const { mutate, status } = useUpdateDivision(props?.division?.id as string);

  // Inisialisasi useForm dengan defaultValues dari props.division
  const form = useForm({
    resolver: zodResolver(CreateDivisionSchema),
    defaultValues: {
      name: props.division?.name || '',
      latitude: props.division?.location.split(',')[0] || '',
      longitude: props.division?.location.split(',')[1] || '',
      entry_time: props.division?.entry_time || '',
      leave_time: props.division?.leave_time || ''
    }
  });

  // Reset form ketika division berubah
  useEffect(() => {
    form.reset({
      name: props.division?.name || '',
      latitude: props.division?.location.split(',')[0] || '',
      longitude: props.division?.location.split(',')[1] || '',
      entry_time: props.division?.entry_time || '',
      leave_time: props.division?.leave_time || ''
    });
  }, [props.division, form]);

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Divisi</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada divisi. Klik simpan ketika sudah selesai.
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
              name: 'name',
              type: 'text',
              placeholder: 'IT Operation',
              label: 'Nama Divisi'
            },
            {
              name: 'latitude',
              type: 'text',
              label: 'Latitude'
            },
            {
              name: 'longitude',
              type: 'text',
              label: 'Longitude'
            },
            {
              name: 'entry_time',
              type: 'timepicker',
              placeholder: '17:00',
              label: 'Jam Masuk'
            },
            {
              name: 'leave_time',
              placeholder: '17:00',
              type: 'timepicker',
              label: 'Jam Pulang'
            }
          ]}
        />

        <DialogFooter>
          <Button type="submit" form="form" loading={status == 'pending'}>
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
