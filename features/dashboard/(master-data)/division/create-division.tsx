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
import { useCreateDivision } from '@/hooks/useDivision';
import { CreateDivisionSchema } from '@/types/division';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// type FormData = z.infer<typeof CreateDivisionSchema>;

export function CreateDivision(props: Props) {
  const { mutate, status } = useCreateDivision();
  const form = useForm({
    resolver: zodResolver(CreateDivisionSchema)
  });

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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
