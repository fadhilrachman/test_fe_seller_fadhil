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
import {
  useCreateDivision,
  useListDivision,
  useUpdateDivision
} from '@/hooks/useDivision';
import { CreateDivisionSchema, DivisionType } from '@/types/division';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  division: DivisionType | null;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function UpdateDivision(props: Props) {
  const { mutate, status } = useUpdateDivision();
  const form = useForm({
    resolver: zodResolver(CreateDivisionSchema)
  });

  const [latitude, longitude] = props.division?.location
    ? props.division.location.split(',')
    : ['', ''];

  useEffect(() => {
    if (status == 'success') {
      props.onClose();
    }
  }, [status]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Tambah Divisi</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={async (val: any) => {
            await mutate(val);
          }}
          grid={1}
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'IT Operation',
              label: 'Nama Divisi',
              defaultValue: props.division?.name
            },
            {
              name: 'latitude',
              type: 'text',
              label: 'Latitude',
              defaultValue: latitude
            },
            {
              name: 'longitude',
              type: 'text',
              label: 'Longitude',
              defaultValue: longitude
            },
            {
              name: 'entry_time',
              type: 'timepicker',
              placeholder: '17:00',
              label: 'Jam Masuk',
              defaultValue: props.division?.entry_time
            },
            {
              name: 'leave_time',
              placeholder: '17:00',
              type: 'timepicker',
              label: 'Jam Pulang',
              defaultValue: props.division?.leave_time
            }
          ]}
        />
        <DialogFooter>
          <Button type="submit" form="form" loading={status == 'pending'}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
