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
  useCreateMasterShifting,
  useUpdateMasterShifting
} from '@/hooks/master-shifting.hooks';
import { useCreateDivision } from '@/hooks/useDivision';
import {
  CreateMasterShiftingType,
  MasterShiftingType
} from '@/types/master-shifting.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: MasterShiftingType;
  typeForm: 'create' | 'update';
}

type FormData = z.infer<typeof CreateMasterShiftingType>;

export function FormMasterShifting(props: Props) {
  const { mutate: mutateCreate, status: statusCreate } =
    useCreateMasterShifting();
  const { mutate: mutateUpdate, status: statusUpdate } =
    useUpdateMasterShifting(props?.data?.id || '');
  console.log({ id: props.data?.id });

  const form = useForm<FormData>({
    resolver: zodResolver(CreateMasterShiftingType)
  });

  const listConditionForm = {
    title: {
      create: 'Buat',
      update: 'Edit'
    },
    status: {
      create: statusCreate,
      update: statusUpdate
    },
    mutate: {
      create: mutateCreate,
      update: mutateUpdate
    }
  };
  useEffect(() => {
    if (listConditionForm.status[props.typeForm] == 'success') {
      form.reset();
      props.onClose();
    }
  }, [listConditionForm.status[props.typeForm]]);

  useEffect(() => {
    if (props.typeForm == 'update') {
      form.setValue('name', props.data?.name || '');
      form.setValue('entry_hours', props.data?.entry_hours || '');
      form.setValue('leave_hours', props.data?.leave_hours || '');
      form.setValue('description', props.data?.description || '');
    }
  }, [props.data]);
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {listConditionForm.title[props.typeForm]} Master Shifting
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormGenerator
          form={form}
          id="form"
          onSubmit={listConditionForm.mutate[props.typeForm]}
          data={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Shift Pagi',
              label: 'Nama Shifting'
            },
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
          <Button
            type="submit"
            form="form"
            loading={listConditionForm.status[props.typeForm] == 'pending'}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
